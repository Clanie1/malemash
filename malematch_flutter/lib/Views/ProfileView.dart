import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:malematch_flutter/Models/User.dart';
import '../Services/UserService.dart';
import '../Models/Rating.dart';

class ProfileView extends StatefulWidget {
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  late Future<User> userProfile;
  late Future<List<Rating>> ratings;

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    return setState(() {
      userProfile = UserService.fetchUserById(620);
      ratings = UserService.fetchRatingsByUserId();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder<User>(
          future: userProfile,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              final user = snapshot.data!;
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(150),
                    child: Image.memory(
                      base64Decode(user.image ?? ''),
                      fit: BoxFit.cover,
                      width: 100,
                      height: 100,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    user.name ?? '',
                    style: const TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    (user.elo.toString() ?? '') + ' ELO',
                    style: const TextStyle(
                        fontSize: 30, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 20),
                  FutureBuilder<List<Rating>>(
                    future: ratings,
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        final ratingList = snapshot.data!;
                        return Column(
                          children: ratingList.map((rating) {
                            return Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(rating.user1!.name ?? ""),
                                Icon(
                                  rating.whoWonId == rating.user1!.id
                                      ? Icons.check
                                      : Icons.close,
                                  color: rating.whoWonId == rating.user1!.id
                                      ? Colors.green
                                      : Colors.red,
                                ),
                                Text(' VS '),
                                Text(rating.user2!.name ?? ""),
                                Icon(
                                  rating.whoWonId == rating.user2!.id
                                      ? Icons.check
                                      : Icons.close,
                                  color: rating.whoWonId == rating.user2!.id
                                      ? Colors.green
                                      : Colors.red,
                                ),
                              ],
                            );
                          }).toList(),
                        );
                      } else if (snapshot.hasError) {
                        return Text('Error: ${snapshot.error}');
                      } else {
                        return CircularProgressIndicator();
                      }
                    },
                  ),
                ],
              );
            } else if (snapshot.hasError) {
              return Text('Error: ${snapshot.error}');
            } else {
              return CircularProgressIndicator();
            }
          },
        ),
      ),
    );
  }
}
