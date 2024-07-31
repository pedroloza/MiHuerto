import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:mihuerto/components/view_card_components.dart';
import 'package:mihuerto/constants.dart';
import 'package:mihuerto/models/cultivation_model.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mihuerto/screens/add_crops_screen.dart';

import '../components/section_details_crops.dart';
import '../components/section_details_crops_image.dart';

class PlantDetails extends StatefulWidget {
  const PlantDetails({required this.plant, Key? key}) : super(key: key);

  final CultivationModel plant;

  @override
  State<PlantDetails> createState() => _PlantDetailsState();
}

class _PlantDetailsState extends State<PlantDetails> {
  bool favorite = false;
  int quantity = 1;

  @override
  void initState() {
    super.initState();
    initializeDateFormatting().then((_) {
      calculateFutureDate(widget.plant.germinationTime);
    });
  }
  String convertDays(int days) {
    int months = days ~/ 30;
    int remainingDays = days % 30;
    int weeks = remainingDays ~/ 7;
    remainingDays = remainingDays % 7;
     return '$months meses, $weeks semanas y $remainingDays días';
  }
  String calculateFutureDate(int days) {
    DateTime today = DateTime.now();
    DateTime futureDate = today.add(Duration(days: days));
    String formattedDate = DateFormat('dd MMMM yyyy', 'es').format(futureDate);
    return formattedDate;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
        leadingWidth: 0.0,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            CircleAvatar(
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
           /* CircleAvatar(
              backgroundColor: kDarkGreenColor,
              radius: 20.0,
              child: IconButton(
                onPressed: () {
                  setState(() {
                    favorite = !favorite;
                  });
                },
                icon: Icon(
                  favorite == true
                      ? Icons.favorite_rounded
                      : Icons.favorite_border_rounded,
                  color: Colors.white,
                  size: 24.0,
                ),
              ),
            ),*/
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  height: MediaQuery.of(context).size.height * 0.42,
                  color: kSpiritedGreen,
                  padding: const EdgeInsets.only(top: 70.0, bottom: 40),
                  child: Hero(
                    tag: widget.plant.name,
                    child: widget.plant.image.isEmpty?
                    Image.asset("assets/images/logo.png"):
                    Image.network('$urlBase/${widget.plant.image}', fit: BoxFit.contain))
                ),
                Container(
                  height: MediaQuery.of(context).size.height * 0.58,
                  color: kSpiritedGreen,
                ),
              ],
            ),
            Column(
              children: [
                SizedBox(height: MediaQuery.of(context).size.height * 0.42),
                Container(
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(40.0),
                      topRight: Radius.circular(40.0),
                    ),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 24.0, horizontal: 20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Center(
                        child: Container(
                          height: 5.0,
                          width: 80.0,
                          decoration: BoxDecoration(
                              color: kGreyColor,
                              borderRadius: BorderRadius.circular(40.0)),
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      Text(
                        widget.plant.name,
                        textAlign: TextAlign.start,
                        style: GoogleFonts.poppins(
                          fontSize: 28.0,
                          fontWeight: FontWeight.w600,
                          color: kDarkGreenColor,
                        ),
                      ),
                      const SizedBox(height: 16.0),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: kDarkGreenColor,
                          elevation: 20.0,
                          textStyle: GoogleFonts.poppins(
                            fontSize: 15.0,
                            fontWeight: FontWeight.w500,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12.0),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 12.0),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              FontAwesomeIcons.seedling,
                              size: 24.0,
                            ),
                            SizedBox(width: 10.0),
                            Text(
                              'SEMBRAR AHORA ',
                            ),
                          ],
                        ),
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return AddCropsScreen(
                                  idCultivation: widget.plant.id,
                                  nameCultivation: widget.plant.name,
                                );
                              },
                            ),
                          );
                        },
                      ),
                      const SizedBox(height: 16.0),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 2.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Padding(
                              padding:
                              const EdgeInsets.only(top: 10.0, bottom: 20.0),
                              child: Text( widget.plant.description,
                                style: GoogleFonts.poppins(
                                  color: kDarkGreenColor,
                                ),
                              ),
                            ),
                            Padding(
                              padding:
                              const EdgeInsets.only(top: 5.0, bottom: 20.0),
                              child: Text(
                                'Información del cultivo',
                                style: GoogleFonts.poppins(
                                  color: kDarkGreenColor,
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                PlantMetricsWidget(
                                  title: 'Nombre del Cultivo',
                                  value: widget.plant.name,
                                  isIcon: true,
                                  image: "assets/icons/nameCultivo.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Nombre cientifico',
                                  value: widget.plant.scientificName,
                                  isIcon: true,
                                  image: "assets/icons/cosecha.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Tipo Cultivo',
                                  value: widget.plant.categoryData.name,
                                  image: widget.plant.categoryData.image,
                                ),
                              ],
                            ),
                            Padding(
                              padding:
                              const EdgeInsets.only(top: 20.0, bottom: 20.0),
                              child: Text(
                                'Cuando Cultivar',
                                style: GoogleFonts.poppins(
                                  color: kDarkGreenColor,
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            Column(
                              children: [
                                PlantMetricsWidget(
                                  title: 'Germina en',
                                  value: "${widget.plant.germinationTime.toString()} dias.",
                                  isIcon: true,
                                  image: "assets/icons/germinacion.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Se puede cosechar en',
                                  value: convertDays(widget.plant.harvestTime),
                                  isIcon: true,
                                  image: "assets/icons/date.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Si plantas hoy cosecharas en',
                                  value: calculateFutureDate(widget.plant.harvestTime),
                                  isIcon: true,
                                  image: "assets/icons/today.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Temporada de siembra',
                                  value: widget.plant.sowingSeason,
                                  isIcon: true,
                                  image: "assets/icons/season.png",
                                ),
                              ],
                            ),
                            Padding(
                              padding:
                              const EdgeInsets.only(top: 20.0, bottom: 20.0),
                              child: Text(
                                'Como Cultivar',
                                style: GoogleFonts.poppins(
                                  color: kDarkGreenColor,
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                            Column(
                              children: [
                                PlantMetricsWidget(
                                  title: 'Separación entre plantas',
                                  value: "${widget.plant.plotSize.toString()} centimetro",
                                  isIcon: true,
                                  image: "assets/icons/pot.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'PH de suelo de trasplante',
                                  value: widget.plant.transplantSoil,
                                  isIcon: true,
                                  image: "assets/icons/tierra.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: '¿Se puede plantar en casa?',
                                  value: widget.plant.plantedAtHome?"Si":"No",
                                  isIcon: true,
                                  image: "assets/icons/casa.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Tipo de clima',
                                  value: widget.plant.thermalFloor,
                                  isIcon: true,
                                  image: "assets/icons/piso.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Temperatura máxima ideal',
                                  value: '${widget.plant.temperatureMax} °C',
                                  isIcon: true,
                                  image:"assets/icons/temperatureA.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Cantidad de Riego',
                                  value: widget.plant.irrigationAmount??'',
                                  isIcon: true,
                                  image: "assets/icons/irrigation.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Temperatura mínima ideal',
                                  value: '${widget.plant.temperatureMin} °C',
                                  isIcon: true,
                                  image: "assets/icons/temperatureL.png",
                                ),
                                const SizedBox(height: 9),
                                PlantMetricsWidget(
                                  title: 'Luz solar',
                                  value: widget.plant.solarLight,
                                  isIcon: true,
                                  image: "assets/icons/solarLight.png",
                                ),
                                PlantMetricsWidget(
                                  title: 'Tipo de suelo',
                                  value: widget.plant.typeOfSoil,
                                  isIcon: true,
                                  image: "assets/icons/typeLand.png",
                                ),
                              ],
                            ),
                            PlantSection(
                              title:'Plagas',
                              items: widget.plant.plagues,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),
                            PlantSection(
                              title:'Fertilizante Inorgánico',
                              items: widget.plant.fertilisers,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),
                            PlantSection(
                              title: 'Métodos de reproducción',
                              items: widget.plant.reproductions,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),
                            PlantSection(
                              title: 'Vecinos Dañinos',
                              items: widget.plant.harmfulNeighbours,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),
                            PlantSection(
                              title: 'Vecinos Beneficiosos',
                              items: widget.plant.beneficalNeighbours,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),
                            PlantSection(
                              title: 'Abonos orgánicos',
                              items: widget.plant.organicFertilisers,
                              textColor: kDarkGreenColor,
                              backgroundColor: kGinColor,
                            ),

                          ],
                        ),
                      ),

                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      )

    );
  }
}

class PlantMetricsWidget extends StatelessWidget {
  const PlantMetricsWidget({
    required this.title,
    required this.value,
    required this.image,
    this.isIcon = false,
    Key? key,
  }) : super(key: key);

  final String title;
  final String value;
  final String image;
  final bool isIcon;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50.0,
      padding: const EdgeInsets.only(right: 28.0),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: isIcon?Colors.transparent:kGinColor,
            radius: 28.0,
            child: isIcon?
            Image.asset(image, width: 30,):
            image.isEmpty?
            Image.asset("assets/images/logo.png"):
            Image.network('$urlBase/$image',  height: 30,)
          ),
          const SizedBox(width: 12.0),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: GoogleFonts.poppins(
                  fontSize: 15.0,
                  fontWeight: FontWeight.w700,
                  color: kGreyColor,
                ),
              ),
              Align(
                child: Text(
                  value,
                  style:GoogleFonts.poppins(
                    fontSize: 12,
                    color: kDarkGreenColor,
                  ),
                ),
              ),
            ],
          ),

        ],
      ),
    );
  }
}


class StarRating extends StatelessWidget {
  final int scale;
  final double stars;
  final Color? color;
  final double? size;
  final Function(double)? onChanged;

  const StarRating({
    this.scale = 5,
    this.stars = 0.0,
    this.size,
    this.color = Colors.orange,
    this.onChanged,
    Key? key,
  }) : super(key: key);

  Widget buildStar(BuildContext context, int index) {
    IconData icon;
    if (index >= stars) {
      icon = Icons.star_border;
    } else if (index > stars - 1 && index < stars) {
      icon = Icons.star_half;
    } else {
      icon = Icons.star;
    }
    return GestureDetector(
      onTap: () => onChanged!(index + 1.0),
      child: Icon(
        icon,
        color: color,
        size: size,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(
        scale,
        (index) => buildStar(context, index),
      ),
    );
  }
}
