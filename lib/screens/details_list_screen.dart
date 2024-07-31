import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../constants.dart';
class DetailsListScreen extends StatefulWidget {
  final String image;
  final String title;
  final String description;
  const DetailsListScreen({
        super.key,
        required this.image,
        required this.title,
        required this.description
      });

  @override
  State<DetailsListScreen> createState() => _DetailsListScreenState();
}

class _DetailsListScreenState extends State<DetailsListScreen> {
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
                          tag: widget.title,
                          child: widget.image.isEmpty?
                          Image.asset("assets/images/logo.png"):
                          Image.network('$urlBase/${widget.image}', fit: BoxFit.contain))
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
                    height: MediaQuery.of(context).size.height,
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
                          widget.title,
                          textAlign: TextAlign.start,
                          style: GoogleFonts.poppins(
                            fontSize: 28.0,
                            fontWeight: FontWeight.w600,
                            color: kDarkGreenColor,
                          ),
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
                                child: Text( widget.description,
                                  style: GoogleFonts.poppins(
                                    color: kDarkGreenColor,
                                  ),
                                ),
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
