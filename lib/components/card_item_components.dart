import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mihuerto/models/list_item_model.dart';
import 'package:mihuerto/screens/details_list_screen.dart';

import '../constants.dart';

class CartItemCard extends StatefulWidget {
  const CartItemCard({
    required this.item,
    Key? key,
  }) : super(key: key);

  final ListModel item;

  @override
  State<CartItemCard> createState() => _CartItemCardState();
}

class _CartItemCardState extends State<CartItemCard> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: (){
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) {
              return  DetailsListScreen(
                image:  widget.item.image,
                title: widget.item.name,
                description: widget.item.description,
              );
            },
          ),
        );
      },
      child: Container(
        height: 100.0,
        decoration: BoxDecoration(
          color: kGinColor,
          borderRadius: BorderRadius.circular(10.0),
        ),
        padding: const EdgeInsets.all(10.0),
        margin: const EdgeInsets.only(bottom: 16.0),
        child: Row(
          children: [
            Hero(
                tag: widget.item.name,
                child: Container(
                  height: 80.0,
                  width: 80.0,
                  margin: const EdgeInsets.only(right: 15.0),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10.0),
                    image: DecorationImage(
                      image: NetworkImage(
                        '$urlBase/${widget.item.image}'
                    ),
                  ),
                ),
              )
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // The First Widget
                  Text(
                    widget.item.name,
                    style: GoogleFonts.poppins(
                      color: kDarkGreenColor,
                      fontSize: 16.0,
                      fontWeight: FontWeight.w500,
                    ),
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                  // The info about the plant
                  Padding(
                    padding: const EdgeInsets.only(bottom: 6.0),
                    child: Text(
                      widget.item.description,
                      style: GoogleFonts.poppins(
                        color: kGreyColor,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget quantityButton(
      {required IconData icon, required Function() onPressed}) {
    return Container(
      height: 22.0,
      width: 24.0,
      decoration: BoxDecoration(
        border: Border.all(
          width: 1.0,
          color: kDarkGreenColor,
        ),
        borderRadius: BorderRadius.circular(6.0),
      ),
      child: GestureDetector(
        onTap: onPressed,
        child: Icon(
          icon,
          size: 14.0,
        ),
      ),
    );
  }
}
