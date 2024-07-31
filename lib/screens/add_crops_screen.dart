import 'dart:convert';
import 'dart:io';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:dotted_border/dotted_border.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../components/custom_field_components.dart';
import '../constants.dart';

class AddCropsScreen extends StatefulWidget {
  const AddCropsScreen({
    super.key,
    this.idUserCultivation,
    required this.idCultivation,
    required this.nameCultivation,
  });

  static const String id = 'AddCrops';
  final String idCultivation;
  final String? idUserCultivation;
  final String nameCultivation;

  @override
  State<AddCropsScreen> createState() => _AddCropsScreenState();
}

class _AddCropsScreenState extends State<AddCropsScreen> {

  final _nameCultivation = TextEditingController();
  final _noteCultivation = TextEditingController();
  final _dateController = TextEditingController();
  final _numberCultivation = TextEditingController();
  final ImagePicker _picker = ImagePicker();
  bool rememberNextWatering = true;
  bool isUpdateCultivation = false;
  bool isSending = false;
  File? _selectedImage;
  final List<File> _selectedLogBook = [];
  List<Map<String, dynamic>> cultivationList = [];
  String? selectedCultivation;
  String selectedCultivationName = '';
  String? _imageUrl;
  List<String> _galleryUrls = [];

  @override
  void initState() {
    super.initState();
    _loadCultivationData();
  }

  Future<void> _loadCultivationData() async {
    if (widget.idUserCultivation != null) {
      await _loadUserCultivation(widget.idUserCultivation!);
    } else {
      await _loadAvailableCultivations();
    }
  }

  Future<void> _loadUserCultivation(String idUserCultivation) async {
    var url = '$urlBase/$getOneUserCultivation?id=$idUserCultivation';
    try {
      var result = await http.get(Uri.parse(url));
      if (result.statusCode == 200) {
        var response = json.decode(result.body)['data'];
        setState(() {
           _nameCultivation.text = response['name'];
          _dateController.text = response['dateHarvest'];
          _numberCultivation.text = response['numberCultivation'].toString();
           _noteCultivation.text = response['note'];
           rememberNextWatering = response['rememberNextWatering'];
          if (response['image'] != null) {
            _imageUrl = '$urlBase/${response['image']}';
          }
          if (response['gallery'] != null) {
            _galleryUrls = List<String>.from(response['gallery'].map((url) => '$urlBase/$url'));
          }
           isUpdateCultivation = true;
        });
      }
    } on Exception catch (_) {
      rethrow;
    }
  }

  Future<void> _loadAvailableCultivations() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? encodedList = prefs.getString('cultivationList');
    if (encodedList != null) {
      List<dynamic> decodedList = jsonDecode(encodedList);
      setState(() {
        cultivationList = decodedList.map((item) => item as Map<String, dynamic>).toList();
        if (widget.idCultivation == 'new') {
          selectedCultivation = cultivationList[0]['id'].toString();
          selectedCultivationName = cultivationList[0]['name'];
        } else {
          selectedCultivation = widget.idCultivation;
          selectedCultivationName = widget.nameCultivation;
        }
      });
    }
  }

  void _removeImage() {
    setState(() {
      _selectedImage = null;
    });
  }

  void _removeImagesLogBook(int index) {
    setState(() {
      _selectedLogBook.removeAt(index);
    });
  }

  String? _imageToBase64() {
    if (_selectedImage == null) return null;
    final bytes = _selectedImage!.readAsBytesSync();
    final base64String = base64Encode(bytes);
    final mimeType = _selectedImage!.path.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return 'data:$mimeType;base64,$base64String';
  }

  List<String> _imagesToBase64() {
    return _selectedLogBook.map((image) {
      final bytes = image.readAsBytesSync();
      final base64String = base64Encode(bytes);
      final mimeType = image.path.endsWith('.png') ? 'image/png' : 'image/jpeg';
      return 'data:$mimeType;base64,$base64String';
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.0,
        iconTheme: IconThemeData(
          color: kDarkGreenColor,
        ),
        title: Text(
          'Agregar Cultivo'.toUpperCase(),
          style: TextStyle(
            color: kDarkGreenColor,
            fontWeight: FontWeight.w800,
          ),
        ),
        actions: [
          widget.idUserCultivation == null?
              SizedBox():
              IconButton(
                  onPressed: () async {
                    await deleteCultivation(widget.idUserCultivation!, context);
                  },
                  icon: const Icon(
                    Icons.delete,
                    color: Colors.red
                  )
              )
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const SizedBox(height: 10),
              Center(
                child: GestureDetector(
                  onTap: _selectImage,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: DottedBorder(
                      borderType: BorderType.RRect,
                      radius: const Radius.circular(10),
                      dashPattern: const <double>[15, 4],
                      strokeCap: StrokeCap.round,
                      color: kDarkGreenColor,
                      padding: const EdgeInsets.all(20),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(5),
                        child: SizedBox(
                          width: 200,
                          height: 220,
                          child: _selectedImage == null
                              ? (_imageUrl == null
                              ? const Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Icon(
                                size: 50,
                                Icons.photo,
                                color: Colors.green,
                              ),
                              SizedBox(height: 5),
                              Text(
                                'Toma fotografía del cultivo o de la maceta',
                                style: TextStyle(fontSize: 18),
                                textAlign: TextAlign.center,
                              )
                            ],
                          )
                              : Image.network(
                            _imageUrl!,
                            width: double.infinity,
                            height: double.infinity,
                            fit: BoxFit.cover,
                          ))
                              : Stack(
                                children: [
                                  Image.file(
                                    _selectedImage!,
                                    width: double.infinity,
                                    height: double.infinity,
                                    fit: BoxFit.cover,
                                  ),
                                  Positioned(
                                    top: 8,
                                    right: 8,
                                    child: GestureDetector(
                                      onTap: _removeImage,
                                      child: Container(
                                        color: Colors.white,
                                        child: const Icon(
                                          Icons.close,
                                          color: Colors.red,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              widget.nameCultivation != 'new'
                  ? Center(
                      child: Text('Estoy sembrando ${widget.nameCultivation}'),
                    )
                  : DropdownButtonFormField<String>(
                    value: selectedCultivation,
                    icon: Icon(Icons.keyboard_arrow_down, color: kDarkGreenColor),
                    isExpanded: true,
                    padding: const EdgeInsets.only(left: 20.0, right: 20.0, bottom: 15.0),
                    decoration: InputDecoration(
                      contentPadding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                      filled: true,
                      fillColor: kGinColor,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(10),
                        borderSide: BorderSide.none,
                      ),
                      prefixIcon: Icon(FontAwesomeIcons.seedling, color: kDarkGreenColor),
                    ),
                    items: cultivationList.map((cultivation) {
                      return DropdownMenuItem(
                        value: cultivation['id'].toString(),
                        child: Text(
                          cultivation['name'],
                          style: TextStyle(color: kDarkGreenColor, fontWeight: FontWeight.w500),
                        ),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      setState(() {
                        selectedCultivation = newValue;
                        selectedCultivationName = cultivationList
                            .firstWhere((item) => item['id'].toString() == newValue)['name'];
                      });
                    },
                  ),
              Padding(
                padding: widget.nameCultivation == 'new'
                    ? const EdgeInsets.only(left: 20, right: 20, bottom: 20)
                    : const EdgeInsets.all(20),
                child: Text(
                  "Escriba el nombre del cultivo",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              CustomTextField(
                controller: _nameCultivation,
                hintText: 'Nombre cultivo',
                icon: FontAwesomeIcons.seedling,
                keyboardType: TextInputType.name,
                readOnly: isUpdateCultivation,
                onChanged: (value) {},
                onTap: () {},
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20, bottom: 20),
                child: Text(
                  "Cuando fue plantado?",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              CustomTextField(
                controller: _dateController,
                hintText: 'Fecha ',
                icon: Icons.date_range,
                keyboardType: TextInputType.text,
                readOnly: isUpdateCultivation,
                onChanged: (value) {},
                onTap: () {
                  if(!isUpdateCultivation){
                    _selectDate(context);
                  }
                },
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20, bottom: 20),
                child: Text(
                  "Cantidad de plantas sembradas",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              CustomTextField(
                controller: _numberCultivation,
                hintText: 'Cantidad de plantas sembradas',
                icon: FontAwesomeIcons.plantWilt,
                keyboardType: TextInputType.number,
                readOnly: isUpdateCultivation,
                onChanged: (value) {},
                onTap: () {},
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20, bottom: 10),
                child: Text(
                  "Recordatorios",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10.0),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Checkbox(
                          checkColor: Colors.white,
                          fillColor: MaterialStateProperty.all(kDarkGreenColor),
                          value: rememberNextWatering,
                          onChanged: (value) {
                            setState(() {
                              rememberNextWatering = value!;
                            });
                          },
                        ),
                        Text(
                          'Recordatorio de riego',
                          style: TextStyle(
                            color: kGreyColor,
                            fontSize: 14.0,
                          ),
                        )
                      ],
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 20, bottom: 10),
                child: Text(
                  "Registro fotográdico",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              const Text(
                'Aqui podras llevar una bitacora fotografica del cultivo. Puedes agregar o eliminar imagenes a lo largo del tiempo',
                style: TextStyle(fontSize: 18),
                textAlign: TextAlign.center,
              ),
              _selectedLogBook.isNotEmpty || _galleryUrls.isNotEmpty
                  ? Center(
                    child: GestureDetector(
                      onTap: _selectImageSource,
                      child: Icon(
                        Icons.add_a_photo,
                        size: 40,
                        color: kDarkGreenColor,
                      ),
                    ),
                  )
                 : const SizedBox(),
              const SizedBox(height: 10),
              Container(
                height: 120,
                margin: const EdgeInsets.symmetric(horizontal: 10),
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.all(Radius.circular(8)),
                  color: kGinColor,
                ),
                child: _selectedLogBook.isEmpty && _galleryUrls.isEmpty
                    ? Center(
                  child: GestureDetector(
                    onTap: _selectImageSource,
                    child: Icon(
                      Icons.add_a_photo,
                      size: 50,
                      color: kDarkGreenColor,
                    ),
                  ),
                )
                    :ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: _selectedLogBook.length + _galleryUrls.length,
                      itemBuilder: (context, index) {
                        if (index < _galleryUrls.length) {
                          return Stack(
                            children: [
                              Container(
                                margin: const EdgeInsets.all(8.0),
                                child: Image.network(
                                  _galleryUrls[index],
                                  width: 100,
                                  height: 100,
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ],
                          );
                        } else {
                          int localIndex = index - _galleryUrls.length;
                          return Stack(
                            children: [
                              Container(
                                margin: const EdgeInsets.all(8.0),
                                child: Image.file(
                                  _selectedLogBook[localIndex],
                                  width: 100,
                                  height: 100,
                                  fit: BoxFit.cover,
                                ),
                              ),
                              Positioned(
                                top: 4,
                                right: 4,
                                child: GestureDetector(
                                  onTap: () => _removeImagesLogBook(localIndex),
                                  child: Container(
                                    color: Colors.white,
                                    child: const Icon(
                                      Icons.close,
                                      color: Colors.red,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          );
                        }
                      },
                    ),
              ),
              const SizedBox(height: 20),
              Padding(
                padding: const EdgeInsets.only(left: 20, bottom: 10),
                child: Text(
                  "Notas",
                  style: GoogleFonts.poppins(
                    color: kDarkGreenColor,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ),
              CustomTextField(
                controller: _noteCultivation,
                hintText: 'Notas',
                icon: FontAwesomeIcons.notesMedical,
                keyboardType: TextInputType.text,
                readOnly: false,
                onChanged: (value) {},
                onTap: () {},
                maxLines: 5,
              ),
              isSending?
                  const Center(child: CircularProgressIndicator(),)
              :Padding(
                padding: const EdgeInsets.only(left: 30, right: 30, bottom: 60),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    primary: kDarkGreenColor,
                    elevation: 20.0,
                    textStyle: GoogleFonts.poppins(
                      fontSize: 15.0,
                      fontWeight: FontWeight.w500,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.0),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 12.0),
                  ),
                  child:  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        FontAwesomeIcons.seedling,
                        size: 24.0,
                      ),
                      const SizedBox(width: 10.0),
                      Text(
                        isUpdateCultivation?
                        'Actualizar culitvo':' Crear nuevo cultivo '
                      ),
                    ],
                  ),
                  onPressed: () => _submitData(),
                ),
              )

            ],
          ),
        ),
      ),
    );
  }

  Future<void> _selectImage() async {
    if(!isUpdateCultivation) {
      showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return SafeArea(
            child: Wrap(
              children: <Widget>[
                ListTile(
                  leading: const Icon(Icons.photo_library),
                  title: const Text('Galería'),
                  onTap: () async {
                    final pickedFile = await _picker.pickImage(
                        source: ImageSource.gallery);
                    if (pickedFile != null) {
                      setState(() {
                        _selectedImage = File(pickedFile.path);
                      });
                    }
                    Navigator.of(context).pop();
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.camera_alt),
                  title: const Text('Cámara'),
                  onTap: () async {
                    final pickedFile = await _picker.pickImage(
                        source: ImageSource.camera);
                    if (pickedFile != null) {
                      setState(() {
                        _selectedImage = File(pickedFile.path);
                      });
                    }
                    Navigator.of(context).pop();
                  },
                ),
              ],
            ),
          );
        },
      );
    }
  }

  Future<void> _selectImageSource() async {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              ListTile(
                leading: const Icon(Icons.photo_library),
                title: const Text('Galería'),
                onTap: () {
                  Navigator.of(context).pop();
                  _pickImageFromGallery();
                },
              ),
              ListTile(
                leading: const Icon(Icons.camera_alt),
                title: const Text('Cámara'),
                onTap: () {
                  Navigator.of(context).pop();
                  _pickImageFromCamera();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _pickImageFromGallery() async {
    final List<XFile>? pickedFiles = await _picker.pickMultiImage();
    if (pickedFiles != null && pickedFiles.length + _selectedLogBook.length <= 10) {
      setState(() {
        _selectedLogBook.addAll(pickedFiles.map((file) => File(file.path)).toList());
      });
    } else if (pickedFiles != null && pickedFiles.length + _selectedLogBook.length > 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('No puedes seleccionar más de 10 imágenes.'),
        ),
      );
    }
  }

  Future<void> _pickImageFromCamera() async {
    final XFile? image = await _picker.pickImage(source: ImageSource.camera);
    if (image != null && _selectedLogBook.length < 10) {
      setState(() {
        _selectedLogBook.add(File(image.path));
      });
    } else if (image != null && _selectedLogBook.length >= 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('No puedes seleccionar más de 10 imágenes.'),
        ),
      );
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    DateTime? selectedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (selectedDate != null) {
      setState(() {
        _dateController.text = DateFormat('yyyy-MM-dd').format(selectedDate);
      });
    }
  }

  Future<void> _submitData() async {
    setState(() {
      isSending = true;
    });
    if (_areFieldsEmpty()) return;

    final String? base64Image = _imageToBase64();
    final List<String> base64Gallery = _imagesToBase64();
    final String? idUser = await _getUserId();

    if (!isUpdateCultivation && base64Image == null) {
      _showSnackBar('Agregue imagen del cultivo');
      return;
    }

    final Map<String, dynamic> data = _buildRequestData(
      base64Image: base64Image,
      base64Gallery: base64Gallery,
      idUser: idUser,
    );

    try {
      final response = isUpdateCultivation
          ? await _sendUpdateRequest(data)
          : await _sendCreateRequest(data);
      _handleResponse(response);
      setState(() {
        isSending = false;
      });
    } catch (e) {
      _handleError(e);
      setState(() {
        isSending = false;
      });
    }
  }

  bool _areFieldsEmpty() {
    if (_nameCultivation.text.isEmpty) {
      _showSnackBar('Complete todos los campos.');
      return true;
    }

    if (_numberCultivation.text.isEmpty) {
      _showSnackBar('Ingrese la cantidad de plantas.');
      return true;
    }
    if (int.tryParse(_numberCultivation.text) == null || int.parse(_numberCultivation.text) <= 0) {
      _showSnackBar('La cantidad de planta debe ser número positivo');
      return true;
    }
    return false;
  }

  Future<String?> _getUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString("_id");
  }

  Map<String, dynamic> _buildRequestData({
    required String? base64Image,
    required List<String> base64Gallery,
    required String? idUser,
  }) {
    if (isUpdateCultivation) {
      final List<String> combinedGallery = [
        ..._galleryUrls.map((url) => url.replaceFirst('$urlBase/', '')),
        ...base64Gallery,
      ];
      return {
        "note": _noteCultivation.text.isEmpty ? ' ' : _noteCultivation.text,
        "galeriaBase64": combinedGallery,
      };
    } else {
      return {
        "dateHarvest": _dateController.text.toString(),
        "name": _nameCultivation.text.toString(),
        "rememberNextWatering": rememberNextWatering,
        "numberCultivation": _numberCultivation.text,
        "note": _noteCultivation.text.isEmpty ? ' ' : _noteCultivation.text,
        "status": "Creado",
        "harvestNumber": "-1",
        "id_user": idUser.toString(),
        "id_cultivation": selectedCultivation,
        "imagenBase64": base64Image,
        "galeriaBase64": base64Gallery,
      };
    }
  }

  Future<http.Response> _sendUpdateRequest(Map<String, dynamic> data) {
    final String url = '$urlBase/$updateUserCultivation?id=${widget.idUserCultivation}';
    return http.patch(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );
  }

  Future<http.Response> _sendCreateRequest(Map<String, dynamic> data) {
    final String url = '$urlBase/$createUserCultivation';
    return http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );
  }

  void _handleResponse(http.Response response) {
    if (response.statusCode == 200) {
      _showSnackBar('Registro Completo');
      Navigator.of(context).pop();
    } else {
      _showSnackBar('Error al enviar los datos');
    }
  }

  void _handleError(dynamic e) {
    print('Error: $e');
    _showSnackBar('Error de red');
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }


  Future<void> deleteCultivation(String idCultivation, BuildContext context) async {
    var url = '$urlBase/$deleteUserCultivation/$idCultivation';
    try {
      var response = await http.delete(Uri.parse(url));
      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Cultivo eliminado exitosamente')),
        );
        Navigator.of(context).pop();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error al eliminar el cultivo: ${response.statusCode}')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error de red: $e')),
      );
    }
  }
}
