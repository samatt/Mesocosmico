import csv
import os
import random
import requests
import json
from bs4 import BeautifulSoup

INPUTS_DIR=os.path.join(os.path.dirname(__file__),"inputs")
PRODUCTS_FILE = "%s/%s"%(INPUTS_DIR,'hs_products.csv')
COUNTRY_FILE = "%s/%s"%(INPUTS_DIR,'country.csv')
SITC_FILE = "%s/%s"%(INPUTS_DIR,'hs_classification_list.csv')

input_country = ["china","usa","japan","france","netherlands","russia","uk","mexico","uae","india","australia","brazil","turkey","nigeria","hong kong","israel","kenya","south korea","north korea"]


country_req = "https://atlas.media.mit.edu/attr/country/"
country_lookup = {}
country_res = requests.get(country_req, verify=False)
data = json.loads(country_res.text)
items =  data[u'data']
for item in items:
	if u'id_num' in item.keys():
		# print item.keys()
		# print item.values()
		key = item[u'name'].lower()
		value = item[u'display_id']
		country_lookup[key] = value

for i in input_country:
	if i in country_lookup.keys():
		print '<option value="'+country_lookup[i]+'">'+i+'</option>'
input_products_reader = csv.DictReader(open(PRODUCTS_FILE))
input_products_lookup = {}
for row in input_products_reader:
	key = row['id']
	value = row['description']
	input_products_lookup[key] = value

products_reader = csv.DictReader(open(PRODUCTS_FILE))
products_lookup = {}
for row in input_products_reader:
	key = row['HS']
	value = row['name']
	products_lookup[key] = value	

#load HS data
hs_req = "https://atlas.media.mit.edu/attr/hs07"
hs_lookup = {}
hs_r = requests.get(hs_req, verify=False)
print hs_r
data = json.loads(hs_r.text)
items =  data[u'data']
for item in items:
	key = item[u'id']
	value = item[u'name']
	hs_lookup[key] = value
	# print item[u'id'],item[u'name']

if __name__ == '__main__':
	input_country_name =random.choice(input_country)
	output_country_name =random.choice(input_country)
	prod_id = random.choice(input_products_lookup.keys())
	 # = random.choice()

	
	input_country_abbrv = country_lookup[input_country_name].encode('ascii','ignore')
	output_country_abbrv = country_lookup[output_country_name].encode('ascii','ignore')
	print input_country_abbrv,output_country_abbrv


	req = "http://atlas.media.mit.edu/hs/export/2014/%s/%s/show"	%(input_country_abbrv,output_country_abbrv)
	# print req
	r = requests.get(req, verify=False)
	data = json.loads(r.text)
	items =  data[u'data']

	other_products = []
	for item in items:
		hs_id = item[u'hs_id']
		if hs_id in hs_lookup.keys():
			other_products.append(hs_lookup[hs_id])

	print "Other exports : "
	print " ".join(other_products)