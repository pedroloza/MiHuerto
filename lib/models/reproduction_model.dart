class ReproductionModel {
  final String id;
  final String name;
  final String description;
  final String image;

  ReproductionModel({
    required this.id,
    required this.name,
    required this.description,
    required this.image,
  });

  factory ReproductionModel.fromJson(Map<String, dynamic> json) {
    return ReproductionModel(
      id: json['_id'],
      name: json['name'],
      description: json['descripcion']??'', // Note the difference in key
      image: json['image'],
    );
  }
}