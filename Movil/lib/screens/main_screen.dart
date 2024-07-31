import 'package:flutter/material.dart';
import 'package:mihuerto/constants.dart';
import 'package:mihuerto/screens/crops_screen.dart';
import 'package:mihuerto/components/bottom_nav_bar_components.dart';
import 'package:mihuerto/screens/fertilizers_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../components/drawer_components.dart';
import 'category_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  static const String id = 'MainScreen';

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  late PageController _pageController;
  late SharedPreferences prefs;
  int selectedIndex = 0;
  String name = "",  email = "";

  @override
  void initState() {
    _pageController = PageController(initialPage: selectedIndex);
    getInfo();
    super.initState();
  }
  void getInfo() async{
    prefs = await SharedPreferences.getInstance();
    setState(() {
      name = prefs.getString("username")??"";
      name += " ${prefs.getString("lastName")}";
      email = prefs.getString("email")??"";
    });
  }
  void onPageChanged(int page) {
    setState(() {
      _pageController.jumpToPage(selectedIndex);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.0,
        automaticallyImplyLeading: false,
        leading: TextButton(
            onPressed: () {
              _scaffoldKey.currentState?.openDrawer();
            },
            child: Icon(
              FontAwesomeIcons.bars,
              color: kSpiritedGreen,
              size: 30,
            )
        )
      ),
      body:  PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: _pageController,
        onPageChanged: onPageChanged,
        children: const <Widget>[
          CropsScreen(),
          FertilizersScreen(),
          CategoryScreen(),
         // ProfileScreen(),
        ],
      ),
      bottomNavigationBar: CustomBottomNavBar(
        selectedIndex: selectedIndex,
        selectedColor: kDarkGreenColor,
        unselectedColor: kSpiritedGreen,
        onTapped: (index) {
          setState(() {
            selectedIndex = index;
            _pageController.jumpToPage(selectedIndex);
          });
        },
        items: const [
          Icon(FontAwesomeIcons.leaf),
          Icon(FontAwesomeIcons.cubesStacked),
          Icon(FontAwesomeIcons.tableCellsLarge),
        //  Icon(FontAwesomeIcons.person),
        ],
      ),
      drawer: DrawerUi(
          name: name,
          email: email,
      )
    );
  }
}
