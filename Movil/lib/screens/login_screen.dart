import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mihuerto/components/authentication_button_components.dart';
import 'package:mihuerto/components/custom_field_components.dart';
import 'package:mihuerto/components/curve_components.dart';
import 'package:mihuerto/constants.dart';
import 'package:mihuerto/screens/main_screen.dart';
import 'package:mihuerto/screens/signup_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  static const String id = 'LoginScreen';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool rememberMe = false;
  String username = '';
  String password = '';
  final _usernameController = TextEditingController();
  final _passwordController = TextEditingController();
  late SharedPreferences prefs;
  bool isLoading = true;
  @override
  void initState() {
    getUser();
    super.initState();
  }

  getUser() async{
    prefs = await SharedPreferences.getInstance();
    if((prefs.getBool('isLogin') ?? false)) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (BuildContext context) =>  const MainScreen(),
        ),
      );
    }
    setState(() {
      isLoading = false;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Material(
      child: isLoading?
          const Center(
            child: CircularProgressIndicator(),
          )
      :Stack(
        alignment: Alignment.bottomRight,
        fit: StackFit.expand,
        children: [
          // First Child in the stack

          ClipPath(
            clipper: ImageClipper(),
            child: Image.asset(
              'assets/images/leaves.jpg',
              alignment: Alignment.topCenter,
              fit: BoxFit.fitWidth,
            ),
          ),

         /* Positioned(
            top: 30.0,
            left: 20.0,
            child: CircleAvatar(
              backgroundColor: Colors.white,
              radius: 20.0,
              child: IconButton(
                onPressed: () {},
                icon: Icon(
                  Icons.arrow_back_ios_new,
                  color: kDarkGreenColor,
                  size: 24.0,
                ),
              ),
            ),
          ),*/

          // Second Child in the stack
          Positioned(
            height: MediaQuery.of(context).size.height * 0.67,
            width: MediaQuery.of(context).size.width,
            child: Scaffold(
              body: SingleChildScrollView(
                child: Container(
                  constraints: BoxConstraints(
                    maxHeight: MediaQuery.of(context).size.height * 0.67,
                    maxWidth: MediaQuery.of(context).size.width,
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      // First Column
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Text(
                            'Bienvenido de nuevo',
                            style: GoogleFonts.poppins(
                              fontSize: 32.0,
                              fontWeight: FontWeight.w600,
                              color: kDarkGreenColor,
                            ),
                          ),
                          Text(
                            'Acceda a su cuenta',
                            style: GoogleFonts.poppins(
                              color: kGreyColor,
                              fontSize: 15.0,
                            ),
                          )
                        ],
                      ),

                      // Second Column
                      Column(
                        children: [
                          CustomTextField(
                            controller: _usernameController,
                            hintText: 'Usuario',
                            icon: Icons.person,
                            keyboardType: TextInputType.name,
                            readOnly: false,
                            onChanged: (value) {
                              username = value != '' ? value : '';
                            },
                            onTap: (){},
                          ),
                          CustomTextField(
                            controller: _passwordController,
                            hintText: 'Contraseña',
                            icon: Icons.lock,
                            obscureText: true,
                            keyboardType: TextInputType.visiblePassword,
                            readOnly: false,
                            onChanged: (value) {
                              password = value != '' ? value : '';
                            },
                            onTap: (){},
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 10.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Checkbox(
                                      checkColor: Colors.white,
                                      fillColor: MaterialStateProperty.all(
                                          kDarkGreenColor),
                                      value: rememberMe,
                                      onChanged: (value) {
                                        setState(() {
                                          rememberMe = value!;
                                        });
                                      },
                                    ),
                                    Text(
                                      'Remember Me',
                                      style: TextStyle(
                                        color: kGreyColor,
                                        fontSize: 14.0,
                                      ),
                                    )
                                  ],
                                ),
                                TextButton(
                                  onPressed: () {},
                                  style: ButtonStyle(
                                    foregroundColor: MaterialStateProperty.all(
                                        kDarkGreenColor),
                                  ),
                                  child: const Text(
                                    '¿Ha olvidado su contraseña?',
                                  ),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),

                      // Third Column
                      Padding(
                        padding: const EdgeInsets.only(
                          left: 20.0,
                          right: 20.0,
                          bottom: 20.0,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            AuthenticationButton(
                              label: 'Iniciar sesión',
                              onPressed: () {
                                loginUser();
                              },
                            ),
                            Padding(
                              padding: const EdgeInsets.only(top: 10.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Text(
                                    '¿No tienes una cuenta?',
                                    style: TextStyle(fontSize: 14.0),
                                  ),
                                  TextButton(
                                    style: ButtonStyle(
                                      foregroundColor:
                                          MaterialStateProperty.all(
                                              kDarkGreenColor),
                                    ),
                                    onPressed: () {
                                      Navigator.pushNamed(
                                          context, SignupScreen.id);
                                    },
                                    child: const Text(
                                      'Regístrate',
                                      style: TextStyle(fontSize: 14.0),
                                    ),
                                  )
                                ],
                              ),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  loginUser() async {
    if (_usernameController.text.isEmpty || _passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Ingrese el usuario y la contraseña")),
      );
    } else {
      prefs = await SharedPreferences.getInstance();
      var url = Uri.parse('$urlBase$signIn');
      var response = await http.post(url, body: {
        'username': _usernameController.text,
        'password': _passwordController.text,
      });
      var result = json.decode(response.body);
      if (response.statusCode == 200) {
        prefs.setString('_id', result['data']['user']['_id']);
        prefs.setString('name', result['data']['user']['name']);
        prefs.setString('lastName', result['data']['user']['lastName']);
        prefs.setString('username', result['data']['user']['username']);
        prefs.setString('email', result['data']['user']['email']);
        prefs.setBool('isLogin', true);
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (BuildContext context) =>  const MainScreen(),
          ),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
           SnackBar(content: Text(result['message'])),
        );
      }
    }
  }

}
