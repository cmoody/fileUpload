'use strict';

// Declare app level module which depends on filters, and services
angular.module('app.translations', ['pascalprecht.translate'])
  .config(function($translateProvider) {
    $translateProvider.translations('en', {
      'MANUFACTURER': 'Manufacturer',
      'MODEL': 'Model',
      'DEVICE_INFORMATION': 'Device Information',
      'MM_INFORMATION': 'MM Information',
      'CARRIER_INFORMATION': 'Carrier Information',
      'INTERNAL_DEVICE_NAME': 'Internal Device Name',
      'OS': 'OS',
      'COPY': 'Copy',
      'ASSIGNEE': 'Assignee',
      'ID': 'ID',
      'DEVICES': 'Devices',
      'MY_DEVICES': 'My Devices',
      'DEVICE': 'Device',
      'AVAILABLE': 'Available',
      'NAME': 'Name',
      'EDIT': 'Edit',
      'NAME_REQUIRED': 'Name is required',
      'VALID_EMAIL': 'Please enter a valid email address',
      'ADD_DEVICE': 'Add New Device',
      'SERIAL_NUMBER': 'Serial Number',
      'CARRIER': 'Carrier',
      'CAMERA': 'Camera',
      'SIM_TYPE': 'Sim Type',
      'UDID': 'UDID',
      'IMEI': 'IMEI',
      'STORAGE_CAPACITY' : 'Storage Capactiy',
      'FORM_FACTOR' : 'Form Factor',
      'SUPPORTED_NETWORKS' : 'Supported Network Types',
      'ICLOUD_ID': 'iCloud ID',
      'OS_VERSION': 'OS Version',
      'EQUIPMENT_CATEGORY': 'Equipment Category',
      'LOCATION': 'Location',
      'MERAKI': 'Meraki Managed',
      'CELL_ACTIVE': 'Cellular Data Active',
      'REG_DEV_DEVICE': 'Registered Development Device',
      'START_DATE': 'Start Date',
      'END_DATE': 'End Date',
      'PROJECT': 'Project',
      'PROJECTS': 'Projects',
      'PERSON': 'Person',
      'ASSIGNMENTS': 'Assignments',
      'REQUEST': 'Request',
      'REQUESTS': 'Requests',
      'OTHER': 'Other'
    });

    $translateProvider.preferredLanguage('en');
  });