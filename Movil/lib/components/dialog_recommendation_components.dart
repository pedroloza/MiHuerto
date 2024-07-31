import 'package:flutter/material.dart';
import 'package:share/share.dart';

import '../constants.dart';
class RecommendationDialog extends StatelessWidget {
  const RecommendationDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Recomendar Mi Huerto'),
      content: const Text('Comparte\nMi Huerto con tus amigos y familiares:'),
      actions: <Widget>[
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: Text('Cancelar',
              style: TextStyle(
                  color: kDarkGreenColor
              )
          ),
        ),
        ElevatedButton(
          onPressed: () {
            Share.share(
              '¡Hola! Estoy usando la app Mi Huerto para gestionar mis cultivos. ¡Te la recomiendo! Descárgala aquí: [ENLACE DE DESCARGA]',
              subject: 'Recomendación de App',
            );
            Navigator.of(context).pop();
          },
          style: ElevatedButton.styleFrom(
            primary: Color(0xFFC1DFCB), // Color personalizado
          ),
          child:  Text('Compartir',
              style: TextStyle(
                  color: kDarkGreenColor
              )

          ),
        ),
      ],
    );
  }
}