class ListModel {
  String id;
  String name;
  String description;
  String image;

  ListModel({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
  });

  factory ListModel.fromJson(Map<String, dynamic> json) {
    return ListModel(
      id: json['_id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      image: json['image'] as String,
    );
  }

  // Método para convertir una instancia de Product en un mapa
  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'image': image,
    };
  }
}
