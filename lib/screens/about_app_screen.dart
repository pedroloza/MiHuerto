import 'package:flutter/material.dart';

import '../constants.dart';
class AboutAppScreen extends StatefulWidget {
  const AboutAppScreen({super.key});

  static const String id = 'AboutApp';

  @override
  State<AboutAppScreen> createState() => _AboutAppScreenState();
}

class _AboutAppScreenState extends State<AboutAppScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
      backgroundColor: Colors.white,
      elevation: 0.0,
      iconTheme:  IconThemeData(
        color: kDarkGreenColor, //change your color here
      ),
      title:  Text('Acerca de mi huerto'.toUpperCase(),
          style: TextStyle(
              color: kDarkGreenColor,
              fontWeight: FontWeight.w800
          )
      ),
    ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            // Icono principal
            Container(
              height: 80.0,
              width: 80.0,
              margin: const EdgeInsets.only(bottom: 20.0),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                image: const DecorationImage(
                  image: AssetImage('assets/images/logo.png'), // Reemplaza con tu icono
                ),
              ),
            ),
            // Título principal
            const Text(
              'Bienvenido a Mi Huerto',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 50),
            // Descripción de la app
             Row(
              children: [
                Icon(Icons.apps, color: kDarkGreenColor),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    'Apps\nDescarga e instala aplicaciones proporcionadas por tu organización.',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 25),
             Row(
              children: [
                Icon(Icons.devices, color: kDarkGreenColor),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    'Dispositivos\nVe tus dispositivos gestionados.',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 25),
             Row(
              children: [
                Icon(Icons.support, color: kDarkGreenColor),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    'Soporte\nVer opciones de soporte y servicio para tus dispositivos.',
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
            const Spacer(),
            // Texto informativo
            const Text(
              'Tu organización está usando Mi Huerto para gestionar esta aplicación. '
                  'Tu organización puede procesar datos asociados a tu ID de Apple gestionada, '
                  'incluyendo cualquier servicio al que accedas usando esta cuenta. '
                  'Para más información, contacta a tu administrador.',
              style: TextStyle(fontSize: 12),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                // Acción al pulsar el enlace
              },
              child: const Text(
                'Aprende más sobre la recolección, uso y divulgación de datos de \nMi Huerto.',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.blue,
                  decoration: TextDecoration.underline,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
