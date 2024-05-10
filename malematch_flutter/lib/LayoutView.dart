import 'package:animated_bottom_navigation_bar/animated_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:malematch_flutter/Views/LeaderboardView.dart';
import 'package:malematch_flutter/Views/ProfileView.dart';
import 'package:malematch_flutter/Views/RatingView.dart';

List<IconData> iconList = [
  Icons.home,
  Icons.people,
  Icons.favorite,
];

class LayoutView extends StatefulWidget {
  @override
  _LayoutViewState createState() => _LayoutViewState();
}

class _LayoutViewState extends State<LayoutView> {
  int _bottomNavIndex = 2;

  List<Widget> view = [LeaderboardView(), RatingView(), ProfileView()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: view[_bottomNavIndex],
      ),
      bottomNavigationBar: AnimatedBottomNavigationBar(
        backgroundColor: Colors.red,
        icons: iconList,
        activeIndex: 1,
        gapLocation: GapLocation.none,
        notchSmoothness: NotchSmoothness.verySmoothEdge,
        leftCornerRadius: 32,
        rightCornerRadius: 32,
        onTap: (index) => setState(() => _bottomNavIndex = index),
      ),
    );
  }
}
