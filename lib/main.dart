import 'package:flutter/material.dart';
import 'package:mihuerto/screens/about_app_screen.dart';
import 'package:mihuerto/screens/add_crops_screen.dart';
import 'package:mihuerto/screens/category_screen.dart';
import 'package:mihuerto/screens/fertilizers_screen.dart';
import 'package:mihuerto/screens/crops_screen.dart';
import 'package:mihuerto/screens/login_screen.dart';
import 'package:mihuerto/screens/main_screen.dart';
import 'package:mihuerto/screens/plant_list_screen.dart';
import 'package:mihuerto/screens/signup_screen.dart';

void main() {
  // WidgetsFlutterBinding.ensureInitialized();
  // SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: [
  //   SystemUiOverlay.bottom, //This line is used for showing the bottom bar
  // ]);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mi huerto',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const LoginScreen(),
      routes: {
        LoginScreen.id: (context) => const LoginScreen(),
        SignupScreen.id: (context) => const SignupScreen(),
        MainScreen.id: (context) => const MainScreen(),
        CropsScreen.id: (context) => const CropsScreen(),
        PlantListScreen.id: (context) => const PlantListScreen(),
        CategoryScreen.id: (context) => const CategoryScreen(),
        AboutAppScreen.id :(context) => const AboutAppScreen()

      },
    );
  }
}
