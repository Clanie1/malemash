import 'package:flutter/material.dart';

class ProfileView extends StatefulWidget {
  @override
  _ProfileViewState createState() => _ProfileViewState();
}

class _ProfileViewState extends State<ProfileView> {
  // Add your variables and methods here

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(150),
              child: Image.network(
                'https://media.licdn.com/dms/image/D5603AQFmH4WZgKO7yw/profile-displayphoto-shrink_800_800/0/1674516297228?e=2147483647&v=beta&t=NUMzuaY5RSKJhlLKnI1NNFut3owgux9Ty_M7uFatEc0',
                fit: BoxFit.cover,
                width: 100,
                height: 100,
              ),
            ),
            SizedBox(height: 20),
            const Text(
              "Daniel Barocio",
              style: TextStyle(
                color: Colors.black,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              '1500 ELO',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            const Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.check, color: Colors.green),
                    Text('Player 1'),
                    Text(' VS '),
                    Text('Player 2'),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Player 1'),
                    Text(' VS '),
                    Text('Player 2'),
                    Icon(Icons.check,
                        color: Colors.green), // Replace with the winner's mark
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // Replace this with your own method to fetch profile information from an API
  Future<String> fetchProfileInformation() async {
    // Simulate an API call delay
    await Future.delayed(Duration(seconds: 2));
    return 'John Doe'; // Replace this with the actual fetched information
  }
}
