import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mihuerto/components/cultivation_card_components.dart';
import 'package:http/http.dart' as http;
import '../components/no_data_components.dart';
import '../constants.dart';
import '../models/cultivation_model.dart';
import 'details_crops_screen.dart';

class DetailCategory extends StatefulWidget {
  final String categoryId;
  final String name;
  const DetailCategory({
    super.key,
    required this.categoryId,
    required this.name
  });

  @override
  State<DetailCategory> createState() => _DetailCategoryState();
}

class _DetailCategoryState extends State<DetailCategory> {
  List<CultivationModel> filteredCultivations = [];
  bool isLoading = true;
  @override
  void initState() {
    super.initState();
    getCultivation();
  }
  void getCultivation() async{
    var url = '$urlBase$getCultivationUrl&page=1&limit=300';
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        filteredCultivations = (jsonData['data']['data'] as List).map((item) => CultivationModel.fromJson(item)).toList();
        filteredCultivations = filteredCultivations
            .where((cultivation) => cultivation.categoryId == widget.categoryId)
            .toList();
      } else {
        SnackBar(content: Text("Error al obtener las categorías: ${result.statusCode}"));
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

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.0,
        title: Text(widget.name.toUpperCase(),
            style: TextStyle(
                color: kDarkGreenColor,
                fontWeight: FontWeight.w800
            )),
        iconTheme:  IconThemeData(
          color: kDarkGreenColor, //change your color here
        ),
      ),
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.only(left: 10, ),
          child: isLoading?
          const Center(child: CupertinoActivityIndicator()):
          filteredCultivations.isEmpty?
          const NoDataScreen() :
            GridView.builder(
              padding: const EdgeInsets.only(top: 10),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: filteredCultivations.length,
              itemBuilder: (context, index) {
                return CultivationCard(
                  plantType: filteredCultivations[index].scientificName,
                  plantName: filteredCultivations[index].name,
                  plantPrice: 0.0,
                  imageBase64: filteredCultivations[index].image.split(',').last,
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return PlantDetails(
                            plant: filteredCultivations[index],
                          );
                        },
                      ),
                    );
                  },
                );
              },
            ),
          ),
        )
    );
  }
}
