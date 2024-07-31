class UserCultivation {
  final String id;
  final String image;
  final String userCultivationName;
  final String originalCultivationName;
  final String harvestNumber;
  final DateTime datePlantation;
  final DateTime nextWateringDate;
  final String status;

  UserCultivation({
    required this.id,
    required this.image,
    required this.userCultivationName,
    required this.originalCultivationName,
    required this.datePlantation,
    required this.nextWateringDate,
    required this.status,
    required this.harvestNumber
  });

  factory UserCultivation.fromJson(Map<String, dynamic> json) {
    return UserCultivation(
      id: json['id'],
      image: json['image'],
      userCultivationName: json['name'],
      originalCultivationName: json['originalCultivationName'],
      datePlantation: DateTime.parse(json['datePlantation']),
      nextWateringDate: DateTime.parse(json['nextWateringDate']),
      status: json['status'],
      harvestNumber: json['harvestNumber'] as String
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'image': image,
      'name': userCultivationName,
      'originalCultivationName': originalCultivationName,
      'datePlantation': datePlantation.toIso8601String(),
      'nextWateringDate': nextWateringDate.toIso8601String(),
      'status': status,
      'harvestNumber': harvestNumber.toString()
    };
  }
}