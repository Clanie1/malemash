class User {
  int id;
  String email;
  String? name;
  int elo;
  String? image;

  User({
    required this.id,
    required this.email,
    required this.elo,
    this.name,
    this.image,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      elo: json['elo'],
      name: json['name'],
      image: json['image'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'elo': elo,
      'name': name,
      'image': image,
    };
  }
}
