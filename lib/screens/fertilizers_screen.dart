import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mihuerto/constants.dart';
import 'package:http/http.dart' as http;
import '../components/card_item_components.dart';
import '../components/no_data_components.dart';
import '../models/list_item_model.dart';

class FertilizersScreen extends StatefulWidget {
  const FertilizersScreen({Key? key}) : super(key: key);

  static String id = "CartScreen";

  @override
  State<FertilizersScreen> createState() => _FertilizersScreenState();
}

class _FertilizersScreenState extends State<FertilizersScreen> {
  List<ListModel> listModel = [];
  int page = 1, limit = 10;
  bool isLoading = true;
  ScrollController scrollController = ScrollController();
  final GlobalKey<RefreshIndicatorState> refreshKey = GlobalKey<RefreshIndicatorState>();

  @override
  void initState() {
    getCategory();
    scrollController.addListener(() {
      if (scrollController.position.pixels == scrollController.position.maxScrollExtent) {
        setState(() {
          page ++;
        });
      }
    });
    super.initState();
  }

  void getCategory() async{
    var url = '$urlBase$getOrganicFertiliseUrl';
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        listModel = (jsonData['data']['data'] as List).map((item) =>ListModel.fromJson(item)).toList();
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
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: isLoading?
        const Center(child: CupertinoActivityIndicator()):
        listModel.isEmpty?
        const NoDataScreen()
            : Column (
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.9,
                    child: Text(
                      '  Abonos Orgánicos',
                      textAlign: TextAlign.start,
                      style: GoogleFonts.roboto(
                        color: kDarkGreenColor,
                        fontSize: 30.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                  SingleChildScrollView(
                    physics: const BouncingScrollPhysics(),
                    child: Container(
                      height: MediaQuery.of(context).size.height / 1.33,
                      padding: const EdgeInsets.only(
                        top: 10.0,
                        left: 10.0,
                        right: 20.0,
                      ),
                      child: ListView.builder(
                        itemCount: listModel.length,
                        itemBuilder: (context, index) {
                          return CartItemCard(
                            item: listModel[index],
                          );
                        },
                      ),
                    ),
                  ),
                ],
              )

      ),
    );
  }
}

