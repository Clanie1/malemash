import 'package:flutter/material.dart';

class RatingView extends StatefulWidget {
  @override
  _RatingViewState createState() => _RatingViewState();
}

class _RatingViewState extends State<RatingView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: const Text('Rating View 2'),
      // ),
      body: Center(
        child: Column(
          mainAxisAlignment:
              MainAxisAlignment.spaceEvenly, // Add spacing between elements
          children: [
            Container(
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
                child: Image.network(
                  'https://media.licdn.com/dms/image/D5603AQFmH4WZgKO7yw/profile-displayphoto-shrink_800_800/0/1674516297228?e=2147483647&v=beta&t=NUMzuaY5RSKJhlLKnI1NNFut3owgux9Ty_M7uFatEc0',
                  fit: BoxFit.cover,
                  width: 300,
                  height: 300,
                ),
              ),
            ),
            Text(
              "VS",
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
            ),
            Container(
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
                child: Image.network(
                  'https://media.licdn.com/dms/image/C4D03AQGIykPZM9bVUg/profile-displayphoto-shrink_200_200/0/1652808133533?e=2147483647&v=beta&t=3hvZ8AGReArg4dJKg5W6psFoSx1gkItyz5oOQnsW4bs',
                  fit: BoxFit.cover,
                  width: 300,
                  height: 300,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
