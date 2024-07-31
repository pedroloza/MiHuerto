import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:google_fonts/google_fonts.dart';
import 'package:mihuerto/components/cultivation_card_components.dart';
import 'package:mihuerto/constants.dart';
import 'package:mihuerto/models/cultivation_model.dart';
import 'package:mihuerto/screens/details_crops_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../components/category_selector_components.dart';
import '../components/no_data_components.dart';
import '../models/category_model.dart';

class CropsScreen extends StatefulWidget {
  const CropsScreen({Key? key}) : super(key: key);

  static const String id = 'HomeScreen';

  @override
  State<CropsScreen> createState() => _CropsScreenState();
}

class _CropsScreenState extends State<CropsScreen> {

  List<CategoryModel> categories = [];
  List<CultivationModel> cultivation = [];
  List<CultivationModel> filteredCultivations = [];
  String searchQuery = "";
  int selected = 0;
  bool isLoading = true;
  late SharedPreferences prefs;

  @override
  void initState() {
    getCategory();
    super.initState();
  }

  void getCategory() async{
    prefs = await SharedPreferences.getInstance();
    var url = '$urlBase$getCategoryUrl';
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        categories = (jsonData['data']['categories'] as List).map((item) => CategoryModel.fromJson(item)).toList();
        categories.insert(
          0,
          CategoryModel(
            id: 'all',
            name: 'Todos',
            active: true,
            description: 'Incluye todas las categorías.',
            image: '',
          ),
        );
      } else {
        SnackBar(content: Text("Error al obtener las categorías: ${result.statusCode}"));
      }
    }on Exception catch (_) {
      getCultivation();
      rethrow;
    }
    getCultivation();
  }

  void getCultivation() async{
    var url = '$urlBase$getCultivationUrl&page=1&limit=300';
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        cultivation = (jsonData['data']['data'] as List).map((item) => CultivationModel.fromJson(item)).toList();

        setState(() {
          filteredCultivations = cultivation;
        });

        List<Map<String, dynamic>> cultivationList = cultivation.map((item) {
          return {'id': item.id, 'name': item.name};
        }).toList();
        String encodedList = jsonEncode(cultivationList);
        await prefs.setString('cultivationList', encodedList);

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

  void getCultivationsByCategory(String categoryId) {
    setState(() {
      if (categoryId == 'all') {
        filteredCultivations = cultivation;
      } else {
        filteredCultivations = cultivation
            .where((cultivation) => cultivation.categoryId == categoryId)
            .toList();
      }
    });
  }

  void filterCultivations() {
    setState(() {
      if (searchQuery.isEmpty && selected == 0) {
        filteredCultivations = cultivation;
      } else {
        filteredCultivations = cultivation.where((cultivation) {
          final matchesCategory = selected == 0 || cultivation.categoryId == categories[selected].id;
          final matchesSearch = cultivation.name.toLowerCase().contains(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        }).toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10.0),
        child: Column(
          children: [
            SizedBox(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.7,
                    child: Text(
                      ' Cultivos',
                      textAlign: TextAlign.start,
                      style: GoogleFonts.roboto(
                        color: kDarkGreenColor,
                        fontSize: 32.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                  Padding(
                    padding: const EdgeInsets.only(top: 8, bottom: 8),
                    child:TextField(
                      style: TextStyle(color: kDarkGreenColor),
                      cursorColor: kDarkGreenColor,
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.all(10.0),
                        filled: true,
                        fillColor: kGinColor,
                        hintText: 'Buscar cultivo',
                        hintStyle: TextStyle(color: kGreyColor),
                        prefixIcon: Icon(
                          Icons.search,
                          color: kDarkGreenColor,
                          size: 26.0,
                        ),
                        suffixIcon: IconButton(
                          icon: const Icon(Icons.mic),
                          color: kDarkGreenColor,
                          iconSize: 26.0,
                          splashRadius: 20.0,
                          onPressed: () {},
                        ),
                        border: OutlineInputBorder(
                          borderSide: BorderSide(color: kGinColor),
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: kGinColor),
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: kGinColor),
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                      ),
                      onChanged: (value) {
                        setState(() {
                          searchQuery = value;
                        });
                        filterCultivations();
                      },
                    ),
                  ),
                  const SizedBox(height: 5),
                  categories.isEmpty?
                     const Center(child: CupertinoActivityIndicator(),):
                     CategorySelector(
                    selected: selected,
                    categories: categories,
                    onTap: (index) {
                      getCultivationsByCategory(categories[index].id);
                      setState(() {
                        selected = index;
                      });

                    },
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 9,
              child:isLoading?
              const Center(child: CupertinoActivityIndicator(),):
              filteredCultivations.isEmpty?
              const NoDataScreen():
              GridView.builder(
                padding: const EdgeInsets.only(top: 20),
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
                    imageBase64: filteredCultivations[index].image,
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
            )
          ],
        ),
      ),
    );
  }
}

class RecentlyViewedCard extends StatelessWidget {
  const RecentlyViewedCard({
    required this.plantName,
    required this.plantInfo,
    required this.image,
    Key? key,
  }) : super(key: key);

  final String plantName;
  final String plantInfo;
  final ImageProvider<Object> image;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      extendBodyBehindAppBar: true,
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        automaticallyImplyLeading: false,
        leadingWidth: 45,
        leading: TextButton(
          onPressed: () {},
          child: Image.asset(
            'assets/icons/menu.png',
          ),
        ),
        actions: [
          Container(
            padding: const EdgeInsets.only(right: 5, top: 8, bottom: 8 ),
            width: MediaQuery.of(context).size.width / 1.15,
            child: TextField(
              style: TextStyle(color: kDarkGreenColor),
              cursorColor: kDarkGreenColor,
              decoration: InputDecoration(
                contentPadding: const EdgeInsets.only(top: 0,  bottom:  0, left: 20.0, right: 50),
                filled: true,
                fillColor: kGinColor,
                hintText: 'Buscar cultivo',
                hintStyle: TextStyle(color: kGreyColor),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  color: kDarkGreenColor,
                  iconSize: 26.0,
                  splashRadius: 20.0,
                  onPressed: () {},
                ),
                border: OutlineInputBorder(
                  borderSide: BorderSide(color: kGinColor),
                  borderRadius: BorderRadius.circular(15.0),
                ),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: kGinColor),
                  borderRadius: BorderRadius.circular(15.0),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide(color: kGinColor),
                  borderRadius: BorderRadius.circular(15.0),
                ),
              ),
            ),
          )
        ],
      ),
      body: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 60.0,
            height: 60.0,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: image,
              ),
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),
          const SizedBox(width: 10.0),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text(
                plantName,
                style: GoogleFonts.poppins(
                  color: kDarkGreenColor,
                  fontSize: 16.0,
                  fontWeight: FontWeight.w500,
                ),
              ),
              Text(
                plantInfo,
                style: GoogleFonts.poppins(
                  color: kGreyColor,
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}




