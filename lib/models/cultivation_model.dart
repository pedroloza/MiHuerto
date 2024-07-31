import 'category_model.dart';
import 'list_item_model.dart';
import 'plague_model.dart';
import 'reproduction_model.dart';
import 'fertiliser_model.dart';

class CultivationModel {
  final String id;
  final String name;
  final String scientificName;
  final String description;
  final String image;
  final bool active;
  final String categoryId;
  final CategoryModel categoryData;
  final List<PlagueModel> plagues;
  final int germinationTime;
  final int harvestTime;
  final String sowingSeason;
  final String solarLight;
  final bool plantedAtHome;
  final String plotSize;
  final String? irrigationAmount;
  final String thermalFloor;
  final String typeOfSoil;
  final int temperatureMax;
  final int temperatureMin;
  final String transplantSoil;
  final List<FertiliserModel> fertilisers;
  final List<ListModelData> reproductions;
  final List<ListModelData> beneficalNeighbours;
  final List<ListModelData> harmfulNeighbours;
  final List<ListModelData>? organicFertilisers;

  CultivationModel({
    required this.id,
    required this.name,
    required this.scientificName,
    required this.description,
    required this.image,
    required this.active,
    required this.categoryId,
    required this.categoryData,
    required this.plagues,
    required this.germinationTime,
    required this.harvestTime,
    required this.sowingSeason,
    required this.solarLight,
    required this.plantedAtHome,
    required this.plotSize,
    required this.thermalFloor,
    required this.typeOfSoil,
    required this.fertilisers,
    required this.reproductions,
    required this.temperatureMax,
    required this.temperatureMin,
    required this.transplantSoil,
    required this.beneficalNeighbours,
    required this.harmfulNeighbours,
    this.organicFertilisers,
    this.irrigationAmount,
  });

  factory CultivationModel.fromJson(Map<String, dynamic> json) {
    return CultivationModel(
      id: json['_id'],
      name: json['name'],
      scientificName: json['scientificName'],
      description: json['description'],
      image: json['image'],
      active: json['active'],
      plagues: (json['plaguesId']['plagueData'] as List)
          .map((item) => PlagueModel.fromJson(item))
          .toList(),
      germinationTime: json['germinationTime'],
      harvestTime: json['harvestTime'],
      sowingSeason: json['sowingSeason'],
      plantedAtHome: json['plantedAtHome'],
      plotSize: json['plotSize'],
      thermalFloor: json['thermalFloor'],
      typeOfSoil: json['typeOfSoil'],
      fertilisers: (json['fertilisersId']['fertiliserData'] as List)
          .map((item) => FertiliserModel.fromJson(item))
          .toList(),
      reproductions: (json['reproductionsId'] as List)
          .map((item) => ListModelData.fromJson(item))
          .toList(),
      harmfulNeighbours: (json['harmfulNeighboursId'] as List)
          .map((item) => ListModelData.fromJson(item))
          .toList(),
      beneficalNeighbours: (json['beneficalNeighboursId'] as List)
            .map((item) => ListModelData.fromJson(item))
            .toList(),
     organicFertilisers: json['organicFertilisersId'] != null
            ? (json['organicFertilisersId'] as List)
            .map((item) => ListModelData.fromJson(item as Map<String, dynamic>))
            .toList()
            : null,
        categoryData: CategoryModel.fromJson(json['categoryData']),
      categoryId: json['categoryId'],
      solarLight: json['solarLight']??'',
      temperatureMin: json['temperatureMin'],
      temperatureMax: json['temperatureMax'],
      transplantSoil: json['transplantSoil'],
      irrigationAmount: json['irrigationAmount']
    );
  }
}


class ListModelData {
  String id;
  String name;

  ListModelData({required this.id, required this.name});

  factory ListModelData.fromJson(Map<String, dynamic> json) {
    return ListModelData(
      id: json['_id'],
      name: json['name'],
    );
  }
}