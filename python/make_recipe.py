import sys
import csv
import os
import random
import requests
import json
import simplejson
import pprint
# from bs4 import BeautifulSoup
requests.packages.urllib3.disable_warnings()

INPUTS_DIR=os.path.join(os.path.dirname(__file__),"inputs")
PRODUCTS_FILE = "%s/%s"%(INPUTS_DIR,'hs_products.csv')
COUNTRY_FILE = "%s/%s"%(INPUTS_DIR,'country.csv')
SITC_FILE = "%s/%s"%(INPUTS_DIR,'hs_classification_list.csv')
CATEGORIES_FILE = "%s/%s"%(INPUTS_DIR,'hs_categories.json')
input_country = ["china","usa","japan","france","netherlands","russia","uk","mexico","uae","india","australia","brazil","turkey","nigeria","hong kong","israel","kenya","south korea","north korea"]

ICONS_DIR = os.path.join(os.path.dirname(__file__),"../public/svg/HS Icons")

codes_with_icons = [ f.replace(".svg","") for f in os.listdir(ICONS_DIR) if os.path.isfile(os.path.join(ICONS_DIR,f)) ]

# print onlyfiles
# print CATEGORIES_FILE

country_req = "https://atlas.media.mit.edu/attr/country/"
country_lookup = {}
country_res = requests.get(country_req, verify=True)
data = json.loads(country_res.text)

with open(CATEGORIES_FILE) as data_file:    
    hs_categories = json.load(data_file)
# print hs_categories


items =  data[u'data']
for item in items:
	if u'id_num' in item.keys():
		# print item.keys()
		# print item.values()
		key = item[u'name'].lower()
		value = item[u'display_id']
		country_lookup[key] = value

# for i in input_country:
	# if i in country_lookup.keys():
		# print '<option value="'+country_lookup[i]+'">'+i+'</option>'

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
hs_r = requests.get(hs_req, verify=True)

data = json.loads(hs_r.text)
items =  data[u'data']
for item in items:
	key = item[u'id']
	value = item[u'name']
	hs_lookup[key] = value
	# print item[u'id'],item[u'name']


def getProductCategory(hs_id,cat_name):
	# print hs_id[2:4],cat_name
	cat_id = hs_id[2:4]
	for k,v in hs_categories.iteritems():
		if cat_id in v:
			return k

if __name__ == '__main__':
	iconsMode = False
	if len(sys.argv) <3 :	
		print "Not enough arguments using random countries"
		input_country_name =random.choice(input_country)
		output_country_name =random.choice(input_country)
		input_country_abbrv = country_lookup[input_country_name]
		output_country_abbrv = country_lookup[output_country_name]		
	else:
		# print sys.argv[1],type(sys.argv[1])
		if sys.argv[1] == "icons":
			# print "HERE"
			iconsMode = True
			input_country_abbrv = sys.argv[2].encode('ascii','ignore')
			output_country_abbrv = sys.argv[3].encode('ascii','ignore')
			pass
		else:
			input_country_abbrv = sys.argv[1].encode('ascii','ignore')
			output_country_abbrv = sys.argv[2].encode('ascii','ignore')

	# print  sys.argv[1]
	# if sys.argv[2]:
	# print sys.argv[2]

	
	# prod_id = random.choice(input_products_lookup.keys())
	 # = random.choice()

	# print input_country_abbrv,output_country_abbrv
	# req = "http://atlas.media.mit.edu/hs/export/all/%s/%s/show"%(input_country_abbrv,output_country_abbrv)
	# print req
	req = "http://atlas.media.mit.edu/hs07/import/2010.2012/%s/%s/all"%(input_country_abbrv,output_country_abbrv)

	# req = "http://atlas.media.mit.edu/hs07/export/2010/%s/all/show"%(input_country_abbrv)
	
	r = requests.get(req, verify=False)
	data = json.loads(r.text)
	items =  data[u'data']

	other_products = []
	results = {}
	icons = set()
	for item in items:
		if item[u'hs07_id_len'] == 6:
			hs_id = item[u'hs07_id']
			hs_4_dig_id =  hs_id[-4:]
			if hs_id in hs_lookup.keys():
				cat = getProductCategory(hs_id,hs_lookup[hs_id])
				cat = cat.encode('ascii','ignore')
				product  = hs_lookup[hs_id].encode('ascii','ignore')
				if iconsMode is True:
					# print hs_4_dig_id
					if hs_4_dig_id in codes_with_icons:
						icons.add(hs_4_dig_id)
				else:
					if cat in results.keys():
						results[cat]["products"].append(product.replace("\'",""))
					else:
						results[cat.replace("\'","")] ={}
						results[cat.replace("\'","")]["products"] = [product.replace("\'","")]
						results[cat.replace("\'","")]["hs_6_id"] = hs_id
						results[cat.replace("\'","")]["hs_4_id"] = hs_4_dig_id
	if icons:
	# pprint.pprint(list(icons))
		print json.dumps(list(icons))
	else:
		pprint.pprint(results)
		print json.dumps(results)
