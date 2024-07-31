import 'dart:convert';

import 'package:flutter/material.dart';

import '../constants.dart';
import 'curve_components.dart';
class CultivationCard extends StatelessWidget {
  const CultivationCard({
    required this.plantType,
    required this.plantName,
    required this.plantPrice,
    required this.imageBase64,
    required this.onTap,
    Key? key,
  }) : super(key: key);

  final String plantType;
  final String plantName;
  final double plantPrice;
  final String imageBase64;
  final Function() onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Container(
            height: 220.0,
            width: 185.0,
            decoration: BoxDecoration(
              color: kGinColor,
              borderRadius: BorderRadius.circular(20.0),
            ),
            child: CustomPaint(
              painter: CurvePainter(),
            ),
          ),
          Positioned(
            // height: 240.0,
            // width: 124.0,
            left: 8.0,
            bottom: 60.0,
            child: Container(
              constraints:
              const BoxConstraints(maxWidth: 124.0, maxHeight: 240.0),
              child: Hero(
                  tag: plantName,
                  child: Image.network('$urlBase/$imageBase64')
              )
               //   Image.network(base64Decode(imageBase64), fit: BoxFit.cover)),
            ),
          ),
          Positioned(
            bottom: 0.0,
            left: 0.0,
            child: Container(
              width: 185,
              height: 60.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20.0),
              ),
              child: Padding(
                  padding:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 8.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        plantType,
                        style: TextStyle(
                          color: kDarkGreenColor,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                      const SizedBox(height: 2.0),
                      Expanded(
                        child: Text(
                          plantName,
                          overflow: TextOverflow.fade,
                          maxLines: 1,
                          softWrap: false,
                          style: TextStyle(
                            color: kDarkGreenColor,
                            fontSize: 16.0,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  )
              ),
            ),
          ),
        ],
      ),
    );
  }
}