import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../constants.dart';
class ViewCard extends StatefulWidget {
  const ViewCard({
    required this.plantName,
    required this.plantInfo,
    required this.image,
    Key? key,
  }) : super(key: key);

  final String plantName;
  final String plantInfo;
  final String image;

  @override
  State<ViewCard> createState() => _ViewCardState();
}

class _ViewCardState extends State<ViewCard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 20,
      decoration: BoxDecoration(
        color: kGinColor,
        borderRadius: BorderRadius.circular(10.0),
      ),
      padding: const EdgeInsets.all( 10.0),
      margin: const EdgeInsets.only(bottom: 5.0),
      child: Column(
        children: [
          /*Container(
            width: 60.0,
            height: 60.0,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(
                  '$urlBase/${widget.image}'
                ),
              ),
              borderRadius: BorderRadius.circular(10.0),
            ),
          ),*/
          Text(
            widget.plantName,
            style: GoogleFonts.poppins(
              color: kDarkGreenColor,
              fontSize: 12.0,
              fontWeight: FontWeight.w500,
            ),
            maxLines: 2,
          ),
        ],
      ),
    );
  }
}
