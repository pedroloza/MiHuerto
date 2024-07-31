import 'dart:async';
import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:mihuerto/screens/details_category_screen.dart';
import '../components/no_data_components.dart';
import '../constants.dart';
import '../models/category_model.dart';

class CategoryScreen extends StatefulWidget {
  const CategoryScreen({super.key});
  static const String id = 'Category';
  @override
  State<CategoryScreen> createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> with AutomaticKeepAliveClientMixin<CategoryScreen> {

  int page = 1, limit = 10;
  bool isLoading = true;
  ScrollController scrollController = ScrollController();
  List<CategoryModel> categories = [];
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
    var url = '$urlBase$getCategoryUrl';
    try{
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var jsonData = json.decode(result.body);
        categories = (jsonData['data']['categories'] as List).map((item) => CategoryModel.fromJson(item)).toList();
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

  Future refresh(){
    Completer<void> completer = Completer<void>();
    Timer timer = Timer(const Duration(seconds: 1), () {
      completer.complete();
      getCategory();
    });
    return completer.future;
  }

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
          child: isLoading?
          const Center(child: CupertinoActivityIndicator(),):
          categories.isEmpty?
          const NoDataScreen()
              : Column (
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.7,
                    child: Text(
                      '  Categorías',
                      textAlign: TextAlign.start,
                      style: GoogleFonts.roboto(
                        color: kDarkGreenColor,
                        fontSize: 32.0,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(height: 5),
                   Expanded(
                     child: RefreshIndicator(
                       onRefresh: refresh,
                       key: refreshKey,
                       child: ListView.builder(
                         controller: scrollController,
                         itemCount: categories.length,
                         itemBuilder: (context, index) {
                           return carCategory(index);
                           },
                       ),
                     ),
                   ),
                ],
          )
      ),

    );
  }

  Widget carCategory(int index){
    return Container(
      height: 100.0,
      decoration: BoxDecoration(
        color: kGinColor,
        borderRadius: BorderRadius.circular(10.0),
      ),
      padding: const EdgeInsets.all(10.0),
      margin: const EdgeInsets.only(bottom: 16.0, left: 10 ,right: 10),
      child: GestureDetector(
        onTap: (){
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return  DetailCategory(
                  categoryId: categories[index].id,
                  name: categories[index].name,
                );
              },
            ),
          );
        },
        child:  Row(
          children: [
            Container(
              height: 80.0,
              width: 80.0,
              margin: const EdgeInsets.only(right: 15.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                image: DecorationImage(
                  image: NetworkImage(
                    '$urlBase/${categories[index].image}',
                  ),
                ),
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    categories[index].name,
                    style: GoogleFonts.poppins(
                      color: kDarkGreenColor,
                      fontSize: 16.0,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  // The info about the plant
                  Padding(
                      padding: const EdgeInsets.only(bottom: 6.0),
                      child: Text(
                        categories[index].description,
                        style: GoogleFonts.poppins(
                          color: kGreyColor,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 2,
                      )
                  ),
                ],
              ),
            ),
          ],
        ),
      )
    );
  }

  @override
  bool get wantKeepAlive => true;
}
