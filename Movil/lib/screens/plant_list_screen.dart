import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:mihuerto/screens/add_crops_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../components/no_data_components.dart';
import '../components/plant_card_components.dart';
import '../constants.dart';
import '../models/user_cultivation.dart';
class PlantListScreen extends StatefulWidget {
  const PlantListScreen({super.key});
  static const String id = 'PlantList';
  @override
  State<PlantListScreen> createState() => _PlantListScreenState();
}

class _PlantListScreenState extends State<PlantListScreen> {
  List<UserCultivation> _listUserCultivation = [];
  bool isLoading = true;
  @override
  void initState() {
    super.initState();
    listUserCultivation();
  }

  void listUserCultivation() async{
    var prefs = await SharedPreferences.getInstance();
    var idUser = prefs.getString("_id");
    var url = '$urlBase$getListUserCultivation$idUser';
    print(url);
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        _listUserCultivation = (jsonData['data'] as List).map((item) => UserCultivation.fromJson(item)).toList();
      }
    }on Exception catch (_) {
      setState(() {
        isLoading = false;
      });
      rethrow;
    }
    setState(() {
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0.0,
          iconTheme:  IconThemeData(
            color: kDarkGreenColor, //change your color here
          ),
          title:  Text('Mi cultivo'.toUpperCase(),
              style: TextStyle(
                  color: kDarkGreenColor,
                  fontWeight: FontWeight.w800
              )
          ),
        ),
      body: SafeArea(
        child:isLoading?
        const Center(child: CupertinoActivityIndicator(),):
        _listUserCultivation.isEmpty?
        const NoDataScreen()
            : SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child:Container(
                  height: MediaQuery.of(context).size.height,
                  padding: const EdgeInsets.only(
                    top: 10.0,
                    left: 10.0,
                    right: 20.0,
                  ),
                  child: ListView.builder(
                    itemCount: _listUserCultivation.length,
                    itemBuilder: (context, index) {
                      return PlantCard(
                        id: _listUserCultivation[index].id!,
                        plantName: _listUserCultivation[index].userCultivationName,
                        plantImage: _listUserCultivation[index].image,
                        plantingDate: _listUserCultivation[index].datePlantation.toString(),
                        nextWatering: _listUserCultivation[index].nextWateringDate.toString(),
                        status: _listUserCultivation[index].status.toString(),
                        harvestNumber: _listUserCultivation[index].harvestNumber,
                        originalCultivationName: _listUserCultivation[index].originalCultivationName,
                      );
                    },
                  ),
                ),
              ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: kDarkGreenColor,
        tooltip: 'Agregar Cultivo',
        onPressed: (){
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) {
                return const AddCropsScreen(
                  idCultivation: "new",
                  nameCultivation: "new",
                );
              },
            ),
          );
        },
        child: const Icon( FontAwesomeIcons.seedling, color: Colors.white, size: 28),
     )
    );
  }
}
