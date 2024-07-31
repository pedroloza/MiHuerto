import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mihuerto/constants.dart';

class CustomTextField extends StatelessWidget {
  const CustomTextField({
    required this.controller,
    required this.hintText,
    required this.icon,
    this.obscureText = false,
    required this.keyboardType,
    required this.onChanged,
    required this.onTap,
    required this.readOnly,
    this.maxLines = 1,
    Key? key,
  }) : super(key: key);

  final String hintText;
  final IconData icon;
  final bool obscureText;
  final TextInputType keyboardType;
  final Function(String) onChanged;
  final Function() onTap;
  final TextEditingController controller;
  final bool readOnly;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20.0, right: 20.0, bottom: 15.0),
      child: TextField(
        controller: controller,
        cursorColor: kDarkGreenColor,
        obscureText: obscureText,
        keyboardType: keyboardType,
        style: GoogleFonts.poppins(
          color: kDarkGreenColor,
          fontWeight: FontWeight.w600,
          fontSize: 15.0,
        ),
        decoration: InputDecoration(
          contentPadding: const EdgeInsets.all(10.0),
          filled: true,
          fillColor: kGinColor,
          prefixIcon: maxLines == 1 ?
          Icon(
            icon,
            size: 24.0,
            color: kDarkGreenColor,
          ): null,
          hintText: hintText,
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
        onChanged: onChanged,
        onTap: onTap,
        readOnly: readOnly,
        maxLines: maxLines,
      ),
    );
  }
}
