import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PlantSection extends StatelessWidget {
  final String title;
  final List<dynamic>? items;
  final Color textColor;
  final Color backgroundColor;

  const PlantSection({
    required this.title,
    required this.items,
    required this.textColor,
    required this.backgroundColor,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return items != null && items!.isNotEmpty
        ? Padding(
            padding: const EdgeInsets.only(top: 5.0, bottom: 5.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.poppins(
                    color: textColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  height: 40,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: items!.length,
                    itemBuilder: (context, index) {
                      return Container(
                        margin: const EdgeInsets.symmetric(horizontal: 2.0),
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: backgroundColor,
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        padding: const EdgeInsets.all(8),
                        child: Text(
                          items![index].name,
                          style: TextStyle(
                            color: textColor,
                            fontWeight: FontWeight.w500,
                            fontSize: 15.0,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      );
                    },
                  ),
                )
              ],
            ),
          )
        : const SizedBox();
  }
}
