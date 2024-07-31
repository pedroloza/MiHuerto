import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Color kDarkGreenColor = const Color(0xFF184A2C);
Color kGinColor = const Color(0xFFE5F0EA);
Color kSpiritedGreen = const Color(0xFFC1DFCB);
Color kFoamColor = const Color(0xFFEBFDF2);
Color kGreyColor = Colors.grey.shade600;

TextStyle kBillTextStyle = GoogleFonts.poppins(
  color: kDarkGreenColor,
  fontSize: 15.0,
);

//Api
String urlBase = "https://api.mi-huerto.com";//"http://192.168.1.110:3005";//
String createUser = "/v1/api/user/createUser";
String signIn = "/v1/api/user/signIn";
String getCategoryUrl = "/v1/api/category/getAllCategoryActive";
String getCultivationUrl = '/v1/api/cultivation/getAllCultivationActive?active=true';
String getPlagueUrl ='/v1/api/plague/getAllPlague';
String getFertiliseUrl ='/v1/api/fertiliser/getAllFertiliser';
String getOrganicFertiliseUrl ='/v1/api/fertiliser/getAllOrganicFertiliser';
String createUserCultivation ='v1/api/user-cultivation/create';
String getListUserCultivation = '/v1/api/user-cultivation/list/';
String getAllReproductions ='/v1/api/reproduction/getAllReproductions';
String getOneUserCultivation ='v1/api/user-cultivation/getOneUserCultivation';
String updateUserCultivation = 'v1/api/user-cultivation/updateUserCultivation';
String deleteUserCultivation ='v1/api/user-cultivation/deleteUserCultivation';