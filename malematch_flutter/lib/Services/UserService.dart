import 'dart:convert';
import 'package:http/http.dart' as http;
import '../Models/User.dart';

class UserService {
  static const String url = 'http://localhost:3000/user/top';
  static const String url2 = 'http://localhost:3000/user/users-to-rate/620';

  static Future<List<User>> fetchTopUsers() async {
    final response = await http.get(Uri.parse(url));
    print(response.body);
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
    print(response.body);
    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      List<User> posts =
          body.map((dynamic item) => User.fromJson(item)).toList();
      return posts;
    } else {
      throw Exception('Failed to load posts');
    }
  }
}
