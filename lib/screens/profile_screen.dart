import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../constants.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {

  late SharedPreferences prefs;
  String name = "",  email = "";

  @override
  void initState() {
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.7,
              child: Text(
                '  Mi Perfil',
                textAlign: TextAlign.start,
                style: GoogleFonts.roboto(
                  color: kDarkGreenColor,
                  fontSize: 32.0,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Center(
              child:  CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/images/Dhairye.jpg'), // Añade la imagen de perfil aquí
              ),
            ),
            const SizedBox(height: 10),
             Center(
              child: Text(name!,
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 5),
            Center(
              child: Text(email!,
                style: TextStyle(color: Colors.grey[600]),
              ),
            ),
            const SizedBox(height: 20),
            const Divider(),
            ListTile(
              leading: Icon(Icons.logout),
              title: Text('Log Out'),
              trailing: Icon(Icons.arrow_forward_ios),
              onTap: () {
                // Acción al tocar el ítem
              },
            ),
          ],
        ),
      ),

    );
  }
}