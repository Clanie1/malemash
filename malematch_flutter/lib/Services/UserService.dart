import 'dart:convert';
import 'package:http/http.dart' as http;
import '../Models/User.dart';

class UserService {
  static const String url = 'http://localhost:3000/user/top';
  static const String url2 = 'http://localhost:3000/user/users-to-rate/620';
  static const String url3 = 'http://localhost:3000/rating';

  static Future<List<User>> fetchTopUsers() async {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      List<User> posts =
          body.map((dynamic item) => User.fromJson(item)).toList();
      return posts;
    } else {
      throw Exception('Failed to load posts');
    }
  }

  static Future<List<User>> fetchUsersToRate() async {
    final response = await http.get(Uri.parse(url2));
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      List<User> posts =
          body.map((dynamic item) => User.fromJson(item)).toList();
      return posts;
    } else {
      throw Exception('Failed to load posts');
    }
  }

  static Future<String> rateUsers(userId1, userId2, selectedUserId) async {
    int authorId = 620;
    var requestBody = jsonEncode({
      'authorId': authorId,
      'userId1': userId1,
      'userId2': userId2,
      'selectedUserId': selectedUserId,
    });

    var response = await http.post(headers: {
      'Content-Type': 'application/json',
    }, Uri.parse(url3), body: requestBody);
    print(response.statusCode);
    if (response.statusCode > 199 && response.statusCode < 300) {
      return response.body;
    } else {
      throw Exception('Failed to rate users');
    }
  }

  static Future<User> fetchUserById(int id) async {
    final response =
        await http.get(Uri.parse('http://localhost:3000/user/$id'));
    if (response.statusCode == 200) {
      return User.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load user');
    }
  }
}
