import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:mihuerto/components/authentication_button_components.dart';
import 'package:mihuerto/components/custom_field_components.dart';
import 'package:mihuerto/constants.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'main_screen.dart';
class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});
  static String id = 'SignupScreen';
  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {

  final _nameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final _identificationController = TextEditingController();
  final _phoneController = TextEditingController();
  final _userController = TextEditingController();
  final _dateController = TextEditingController();
  late SharedPreferences prefs;
  String _parish = 'Los Esteros';

  var items = [
    "Los Esteros",
    "Manta",
    "San Mateo",
    "Tarqui",
    "Eloy Alfaro",
    "San Lorenzo",
    "Santa Marianita",
  ];
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
        body:  Stack(
          children: [
            SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  SizedBox(height: 45),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        'Regístrate',
                        style: GoogleFonts.poppins(
                          fontSize: 32.0,
                          fontWeight: FontWeight.w600,
                          color: kDarkGreenColor,
                        ),
                      ),
                      const SizedBox(height: 10.0),
                      Text(
                        'Crear una nueva cuenta',
                        style: GoogleFonts.poppins(
                          color: kGreyColor,
                          fontSize: 16.0,
                        ),
                      ),
                      const SizedBox(height: 40.0),
                      CustomTextField(
                        controller: _nameController,
                        hintText: 'Nombre',
                        icon: Icons.person,
                        keyboardType: TextInputType.text,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _lastNameController,
                        hintText: 'Apellidos',
                        icon: Icons.person,
                        keyboardType: TextInputType.text,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _identificationController,
                        hintText: 'Identificación',
                        icon: Icons.perm_contact_cal_rounded,
                        keyboardType: TextInputType.name,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _phoneController,
                        hintText: 'Telefono',
                        icon: Icons.phone,
                        keyboardType: TextInputType.phone,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _userController,
                        hintText: 'Usuario',
                        icon: Icons.person_pin_rounded,
                        keyboardType: TextInputType.text,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _emailController,
                        hintText: 'Email',
                        icon: Icons.mail,
                        keyboardType: TextInputType.emailAddress,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _dateController,
                        hintText: 'Fecha nacimiento',
                        icon: Icons.date_range,
                        keyboardType: TextInputType.text,
                        readOnly: true,
                        onChanged: (value) {},
                        onTap: (){ _selectDate(context); },
                      ),
                      DropdownButtonFormField<String>(
                        value: _parish,
                        icon:  Icon(Icons.keyboard_arrow_down, color: kDarkGreenColor),
                        isExpanded: true,
                        padding: const EdgeInsets.only(left: 20.0, right: 20.0, bottom: 15.0),
                        decoration: InputDecoration(
                          contentPadding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                          filled: true,
                          fillColor: kGinColor,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10),
                            borderSide: BorderSide.none,
                          ),
                          prefixIcon: Icon(Icons.location_city, color:kDarkGreenColor),
                        ),
                        items: items.map((String items) {
                          return DropdownMenuItem(
                            value: items,
                            child: Text(items,
                              style: TextStyle(
                                  color: kDarkGreenColor,
                                  fontWeight: FontWeight.w500
                              ),
                            ),
                          );
                        }).toList(),
                        onChanged: (String? newValue) {
                          setState(() {
                            _parish = newValue!;
                          });
                        },
                      ),
                      CustomTextField(
                        controller: _passwordController,
                        hintText: 'Contraseña',
                        icon: Icons.lock,
                        keyboardType: TextInputType.visiblePassword,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      CustomTextField(
                        controller: _confirmPasswordController,
                        hintText: 'Confirmar contraseña',
                        icon: Icons.lock,
                        keyboardType: TextInputType.visiblePassword,
                        readOnly: false,
                        onChanged: (value) {},
                        onTap: (){},
                      ),
                      const SizedBox(height: 15.0),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Al regístrarte, aceptas nuestros',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.w600,
                              color: kDarkGreenColor,
                            ),
                          ),
                          Text(
                            ' términos y condiciones',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.w600,
                              color: kGreyColor,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'y ',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.w600,
                              color: kDarkGreenColor,
                            ),
                          ),
                          Text(
                            ' política de privacidad',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 15.0,
                              fontWeight: FontWeight.w600,
                              color: kGreyColor,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20.0, right: 20.0, top: 20),
                    child: AuthenticationButton(
                      label: 'Regístrarse',
                      onPressed: () {
                        registerUser();
                      },
                    ),
                  )
                ],
              ),
            ),
            Positioned(
              top: 50.0,
              left: 20.0,
              child: CircleAvatar(
                backgroundColor: Colors.grey.shade300,
                radius: 20.0,
                child: IconButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  icon: Icon(
                    Icons.arrow_back_ios_new,
                    color: kDarkGreenColor,
                    size: 24.0,
                  ),
                ),
              ),
            ),
          ],
        )
    );
  }


  void registerUser() async {
    if (_nameController.text.isEmpty ||
        _lastNameController.text.isEmpty ||
        _emailController.text.isEmpty ||
        _passwordController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty ||
        _identificationController.text.isEmpty ||
        _phoneController.text.isEmpty ||
        _userController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Todos los campos son obligatorios")),
      );
    } else if (!RegExp(r'^[0-9]{10}$').hasMatch(_identificationController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("La identificación debe tener 10 digitos")),
      );
    } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(_emailController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("El formato del correo electrónico es incorrecto")),
      );
    } else if (_passwordController.text.length < 8) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("La contraseña debe tener al menos 8 caracteres")),
      );
    } else if (_passwordController.text != _confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Las contraseñas no coinciden")),
      );
    }  else {
      prefs = await SharedPreferences.getInstance();
      var date = DateTime.now().toString();
      var url = Uri.parse('$urlBase$createUser');
      var response = await http.post(url, body: {
        'username': _userController.text,
        'dni': _identificationController.text,
        'address': 'SD',
        'dateCreated': date,
        'dateOfBirth': _dateController.text,
        'email': _emailController.text,
        'idRole': '6651000e68ebe452e0d5f38b',
        'parish': _parish,
        'phone': _phoneController.text,
        'position': 'Cliente',
        'lastName': _lastNameController.text,
        'name': _nameController.text,
        'password': _passwordController.text
      });

      if (response.statusCode == 200) {
        const SnackBar(content: Text("Registro completo"));
        var respose = json.decode(response.body);
        prefs.setString('_id', respose['data']['_id']);
        prefs.setString('name', respose['data']['name']);
        prefs.setString('lastName', respose['data']['lastName']);
        prefs.setString('username', respose['data']['username']);
        prefs.setString('email', respose['data']['email']);
        prefs.setBool('isLogin', true);
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(
            builder: (BuildContext context) =>  const MainScreen(),
          ),
        );
      } else {
        var respose = json.decode(response.body);
        SnackBar(content: Text(respose['message']));
      }
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    DateTime? selectedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (selectedDate != null) {
      setState(() {
        _dateController.text =  DateFormat('yyyy-MM-dd').format(selectedDate);
      });
    }
  }
}