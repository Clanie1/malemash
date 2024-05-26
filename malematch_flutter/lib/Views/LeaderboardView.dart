import 'package:flutter/material.dart';
import 'package:malematch_flutter/Models/User.dart';
import 'dart:convert';
import '../Services/UserService.dart';
import 'dart:convert'; // For base64 decoding
import 'dart:typed_data'; // For Uint8List

class LeaderboardView extends StatefulWidget {
  @override
  _LeaderboardViewState createState() => _LeaderboardViewState();
}

class _LeaderboardViewState extends State<LeaderboardView> {
  late Future<List<User>> leaderboardData;

  @override
  void initState() {
    super.initState();
    leaderboardData = UserService.fetchTopUsers();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<User>>(
        future: leaderboardData,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<User> users = snapshot.data!;
            return Container(
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
                itemCount: users.length,
                itemBuilder: (context, index) {
                  User user = users[index];
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
                        child: Image.memory(base64Decode(user.image ?? '')),
                      ),
                      title: Text('ID: ' +
                          user.id.toString() +
                          " " +
                          user.name.toString()),
                      subtitle: Text('Rating: ' + user.elo.toString()),
                    ),
                  );
                },
              ),
            );
          } else if (snapshot.hasError) {
            return Text("Error: ${snapshot.error}");
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
    );
  }
}
