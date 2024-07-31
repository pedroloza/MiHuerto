class PlagueModel {
  final String id;
  final String name;
  final String description;
  final String image;

  PlagueModel({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
  });

  factory PlagueModel.fromJson(Map<String, dynamic> json) {
    return PlagueModel(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      image: json['image'],
    );
  }
}