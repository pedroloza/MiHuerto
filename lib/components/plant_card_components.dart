import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import '../constants.dart';
import '../screens/add_crops_screen.dart';
import 'custom_field_components.dart';

class PlantCard extends StatefulWidget {
  final String id;
  final String plantName;
  final String plantImage;
  final String plantingDate;
  final String nextWatering;
  final String originalCultivationName;
  final String status;
  final String harvestNumber;

  const PlantCard({
    Key? key,
    required this.id,
    required this.plantName,
    required this.plantImage,
    required this.plantingDate,
    required this.nextWatering,
    required this.status,
    required this.originalCultivationName,
    required this.harvestNumber
  }) : super(key: key);

  @override
  _PlantCardState createState() => _PlantCardState();
}

class _PlantCardState extends State<PlantCard> {
  final _harvestNumber = TextEditingController();
  String? harvestNumber;

  @override
  void initState() {
    super.initState();
    initializeDateFormatting().then((_) {
      formatDate(widget.plantingDate);
    });
    setState(() {
      harvestNumber = widget.harvestNumber;
    });
  }

  String calculateFutureDate(int days) {
    DateTime today = DateTime.now();
    DateTime futureDate = today.add(Duration(days: days));
    String formattedDate = DateFormat('dd MMMM yyyy', 'es').format(futureDate);
    return formattedDate;
  }

  String formatDate(String dateString) {
    DateFormat inputFormat = DateFormat("yyyy-MM-dd");
    DateTime date = inputFormat.parse(dateString);
    final DateFormat outputFormat = DateFormat('EEEE d \'de\' MMMM y', 'es');
    return outputFormat.format(date);
  }

  Future<void> updateCultivation() async {
    if (int.tryParse(_harvestNumber.text) == null || int.parse(_harvestNumber.text) <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('El número debe ser positivo')),
      );
      return;
    }
    final String url = '$urlBase/$updateUserCultivation?id=${widget.id}';
    final response = await http.patch(
      Uri.parse(url),
      headers: {
        'Content-Type': 'application/json',
      },
      body: json.encode({
        'harvestNumber': _harvestNumber.text,
      }),
    );

    if (response.statusCode == 200) {
      setState(() {
        harvestNumber = _harvestNumber.text;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Cultivo actualizado correctamente')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error al actualizar el cultivo: ${response.statusCode}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) {
              return AddCropsScreen(
                idUserCultivation: widget.id,
                idCultivation: "",
                nameCultivation: "",
              );
            },
          ),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          color: kGinColor,
          borderRadius: BorderRadius.circular(10.0),
        ),
        padding: const EdgeInsets.all(5.0),
        margin: const EdgeInsets.only(bottom: 16.0),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Image.network(
                    '$urlBase/${widget.plantImage}',
                    width: 40,
                    height: 40,
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.plantName,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width / 3,
                        child: Text(
                          'Plantado el:\n${formatDate(widget.plantingDate)}',
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 12,
                          ),
                        ),
                      )
                    ],
                  ),
                  const Spacer(),
                  Icon(Icons.headset, color: Colors.grey[600]),
                ],
              ),
              const SizedBox(height: 10),
              Text('Cultivo: ${widget.originalCultivationName}', style: TextStyle(color: kDarkGreenColor)),
              const SizedBox(height: 5),
              Text('Próximo riego: ${formatDate(widget.nextWatering)}'),
              const SizedBox(height: 5),
              Text('Estado: ${widget.status}', style: const TextStyle(color: Colors.green)),
              const Divider(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Icon(FontAwesomeIcons.seedling, color: Colors.grey[600]),
                  const Icon(FontAwesomeIcons.basketShopping, color: Colors.green),
                ],
              ),
              if (widget.status == "Listo para cosecha" && harvestNumber == '-1' ) ...[
                const SizedBox(height: 10),
                const Text('¿Cuanto ha cosechado? (lb)'),
                const SizedBox(height: 5),
                SizedBox(
                  height: 38,
                  child: TextField(
                    controller: _harvestNumber,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      contentPadding: const EdgeInsets.only(left: 10.0, right: 5.0),
                      filled: true,
                      fillColor: Colors.white,
                      hintText: "0",
                      hintStyle: GoogleFonts.poppins(
                        color: kDarkGreenColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 15.0,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: kGinColor),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10.0),
                        borderSide: BorderSide(color: kDarkGreenColor),
                      ),
                    ),
                  ),
                ),
                Center(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: kDarkGreenColor,
                      elevation: 5.0,
                      textStyle: GoogleFonts.poppins(
                        fontSize: 15.0,
                        fontWeight: FontWeight.w500,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 45.0),
                    ),
                    onPressed: updateCultivation,
                    child: const Text(
                      ' Guardar ',
                    ),
                  ),
                ),
              ]
            ],
          ),
        ),
      ),
    );
  }
}
