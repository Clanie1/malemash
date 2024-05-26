import 'User.dart';

class Rating {
  int id;
  DateTime createdAt;
  User? author;
  int? authorId;
  User? user1;
  int? user1Id;
  User? user2;
  int? user2Id;
  User? whoWon;
  int? whoWonId;

  Rating({
    required this.id,
    required this.createdAt,
    this.author,
    this.authorId,
    this.user1,
    this.user1Id,
    this.user2,
    this.user2Id,
    this.whoWon,
    this.whoWonId,
  });

  factory Rating.fromJson(Map<String, dynamic> json) {
    return Rating(
      id: json['id'],
      createdAt: DateTime.parse(json['createdAt']),
      // author: User.fromJson(json['author']),
      authorId: json['authorId'],
      user1: User.fromJson(json['user1']),
      user1Id: json['user1Id'],
      user2: User.fromJson(json['user2']),
      user2Id: json['user2Id'],
      whoWonId: json['whoWonId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'createdAt': createdAt.toIso8601String(),
      'author': author?.toJson(),
      'authorId': authorId,
      'user1': user1?.toJson(),
      'user1Id': user1Id,
      'user2': user2?.toJson(),
      'user2Id': user2Id,
      'whoWon': whoWon?.toJson(),
      'whoWonId': whoWonId,
    };
  }
}
