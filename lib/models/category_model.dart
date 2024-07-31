class CategoryModel {
  final String id;
  final String name;
  final bool active;
  final String description;
  final String image;

  CategoryModel({
    required this.id,
    required this.name,
    required this.active,
    required this.description,
    required this.image,
  });

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      id: json['_id'],
      name: json['name'],
      active: json['active'],
      description: json['description'],
      image: json['image'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'active': active,
      'description': description,
      'image': image,
    };
  }
}
