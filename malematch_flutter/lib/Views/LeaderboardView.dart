import 'package:flutter/material.dart';
import 'dart:convert';

class LeaderboardView extends StatefulWidget {
  @override
  _LeaderboardViewState createState() => _LeaderboardViewState();
}

class _LeaderboardViewState extends State<LeaderboardView> {
  List<String> leaderboardData = [];

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    leaderboardData = ["Daniel", "Juanito", "Mau"];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 5,
              blurRadius: 7,
              offset: Offset(0, 3),
            ),
          ],
        ),
        child: ListView.builder(
          itemCount: leaderboardData.length,
          itemBuilder: (context, index) {
            return Container(
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: Colors.grey.withOpacity(0.5),
                    width: 1,
                  ),
                ),
              ),
              child: ListTile(
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(100),
                  child: Image.network(
                    'https://media.licdn.com/dms/image/D5603AQFmH4WZgKO7yw/profile-displayphoto-shrink_800_800/0/1674516297228?e=2147483647&v=beta&t=NUMzuaY5RSKJhlLKnI1NNFut3owgux9Ty_M7uFatEc0',
                    fit: BoxFit.cover,
                    width: 50,
                    height: 50,
                  ),
                ),
                title: Text(leaderboardData[index]),
                subtitle: Text("Rating: 1000"),
              ),
            );
          },
        ),
      ),
    );
  }
}
