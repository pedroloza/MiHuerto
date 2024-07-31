import 'package:flutter/material.dart';
import 'package:mihuerto/models/category_model.dart';

import '../constants.dart';

class CategorySelector extends StatelessWidget {
  const CategorySelector({
    Key? key,
    required this.selected,
    required this.categories,
    required this.onTap,
  }) : super(key: key);

  final int selected;
  final List<CategoryModel> categories;
  final Function(int) onTap;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        height: 34.0,
        child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                for (int i = 0; i < categories.length; i++)
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 120),
                    padding: EdgeInsets.symmetric(
                      vertical: selected == i ? 8.0 : 0.0,
                      horizontal: selected == i ? 12.0 : 7.0,
                    ),
                    decoration: BoxDecoration(
                      color: selected == i ? kGinColor : Colors.transparent,
                      borderRadius: BorderRadius.circular(16.0),
                    ),
                    child: GestureDetector(
                      onTap: () {
                        onTap(i);
                      },
                      child: Align(
                        child: Text(
                          categories[i].name,
                          style: TextStyle(
                            color: selected == i ? kDarkGreenColor : kGreyColor,
                            fontWeight: FontWeight.w500,
                            fontSize: 15.0,
                          ),
                        ),
                      ),
                    ),
                  ),
              ],
            )
        )
    );
  }
}