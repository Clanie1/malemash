import 'package:flutter/material.dart';
import 'dart:convert';
import '../Models/User.dart';
import '../Services/UserService.dart';

class RatingView extends StatefulWidget {
  @override
  _RatingViewState createState() => _RatingViewState();
}

class _RatingViewState extends State<RatingView> {
  late Future<List<User>> usersToRate;

  @override
  void initState() {
    super.initState();
    fetchUsersToRate();
  }

  void handleRating(User user) async {
    try {
      final users = await usersToRate;
      await UserService.rateUsers(users[0].id, users[1].id, user.id);
      await fetchUsersToRate();
    } catch (e) {
      print('Error rating users: $e');
    }
  }

  Future<void> fetchUsersToRate() async {
    return setState(() {
      usersToRate = UserService.fetchUsersToRate();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder<List<User>>(
          future: usersToRate,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              List<User> users = snapshot.data!;
              return Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  GestureDetector(
                    onTap: () => handleRating(users[0]),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 2,
                            blurRadius: 5,
                            offset: Offset(0, 3),
                          ),
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.memory(
                          base64Decode(users[0].image ?? ''),
                          fit: BoxFit.cover,
                          width: 300,
                          height: 300,
                        ),
                      ),
                    ),
                  ),
                  Text(
                    "VS",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                  GestureDetector(
                    onTap: () => handleRating(users[1]),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.5),
                            spreadRadius: 2,
                            blurRadius: 5,
                            offset: Offset(0, 3),
                          ),
                        ],
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.memory(
                          base64Decode(users[1].image ?? ''),
                          fit: BoxFit.cover,
                          width: 300,
                          height: 300,
                        ),
                      ),
                    ),
                  ),
                ],
              );
            } else if (snapshot.hasError) {
              return Text("Error: ${snapshot.error}");
            } else {
              return CircularProgressIndicator();
            }
          },
        ),
      ),
    );
  }
}
