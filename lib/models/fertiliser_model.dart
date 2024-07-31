class FertiliserModel {
  final String id;
  final String name;
  final String description;
  final String image;

  FertiliserModel({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
  });

  factory FertiliserModel.fromJson(Map<String, dynamic> json) {
    return FertiliserModel(
      id: json['_id'],
      name: json['name'],
      description: json['description'],
      image: json['image'],
    );
  }
}