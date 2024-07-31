import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PlantSectionImage extends StatelessWidget {
  final String title;
  final List<dynamic>? items;
  final Color textColor;
  final Color backgroundColor;
  final Widget Function(dynamic item) itemBuilder;

  const PlantSectionImage({
    required this.title,
    required this.items,
    required this.textColor,
    required this.backgroundColor,
    required this.itemBuilder,
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
                  height: MediaQuery.of(context).size.height * 0.13,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: items!.length,
                    itemBuilder: (context, index) {
                      return Container(
                        margin: const EdgeInsets.symmetric(horizontal: 5.0),
                        child: itemBuilder(items![index]),
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
