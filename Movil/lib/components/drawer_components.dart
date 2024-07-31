import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../constants.dart';
import '../screens/about_app_screen.dart';
import '../screens/list_screen.dart';
import '../screens/login_screen.dart';
import '../screens/plant_list_screen.dart';
import 'dialog_rating_components.dart';
import 'dialog_recommendation_components.dart';
class DrawerUi extends StatelessWidget {
  final String name;
  final String email;
  const DrawerUi({
    super.key,
    required this.name,
    required this.email,
  });

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          UserAccountsDrawerHeader(
            accountName: Text(name),
            accountEmail: Text(email),
            currentAccountPicture: const CircleAvatar(
              backgroundColor: Colors.white,
              backgroundImage: AssetImage('assets/images/Dhairye.jpg'), // Añade la imagen de perfil aquí
            ),
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/background.jpg'), // Añade la imagen de fondo aquí
                fit: BoxFit.cover,
              ),
            ),
          ),
          const ListTile(
            title: Text('Mi Huerta'),
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.pagelines),
            title: const Text('Mi cultivo'),
            onTap: () {
              Navigator.pushNamed(context, PlantListScreen.id);
            },
          ),
          const Divider(),
          const ListTile(
            title: Text('Otros'),
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.bug),
            title: const Text('Plagas'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return  ListScreen(
                      title: "Plagas",
                      url: getPlagueUrl,
                    );
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.dna),
            title: const Text('Fertilizante Inorgánico'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return  ListScreen(
                      title: "Fertilizante Inorgánico",
                      url: getFertiliseUrl,
                    );
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.spa),
            title: const Text('Métodos de reprodución'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return  ListScreen(
                      title: "Métodos de reprodución",
                      url: getAllReproductions,
                    );
                  },
                ),
              );
            },
          ),
          const ListTile(
            title: Text('Información'),
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.shareAlt),
            title: const Text('Recomendar app'),
            onTap: () {
              showDialog(
                context: context,
                builder: (context) {
                  return const RecommendationDialog();
                },
              );
            },
          ),
          ListTile(
            leading: const Icon(FontAwesomeIcons.infoCircle),
            title: const Text('Acerca de'),
            onTap: () {
              Navigator.pushNamed(context, AboutAppScreen.id);
            },
          ),
          ListTile(
            leading: const Icon(Icons.star_rate),
            title: const Text('Calificar app'),
            onTap: () {
              showDialog(
                context: context,
                builder: (context) {
                  return RatingDialog();
                },
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.exit_to_app),
            title: const Text('Sign out'),
            onTap: () async {
              SharedPreferences prefs = await SharedPreferences.getInstance();
              prefs.clear();
              Navigator.pushNamed(context, LoginScreen.id);
            },
          ),
          const SizedBox(
            height: 10,
          ),
          const Text("    V.2.1.1")
        ],
      ),
    );
  }
}
