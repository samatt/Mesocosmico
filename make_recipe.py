import sys
import csv
import os
import random
import requests
import json
import pprint
from BeautifulSoup import BeautifulSoup

INPUTS_DIR=os.path.join(os.path.dirname(__file__),"inputs")
PRODUCTS_FILE = "%s/%s"%(INPUTS_DIR,'hs_products.csv')
COUNTRY_FILE = "%s/%s"%(INPUTS_DIR,'country.csv')
SITC_FILE = "%s/%s"%(INPUTS_DIR,'hs_classification_list.csv')
CATEGORIES_FILE = "%s/%s"%(INPUTS_DIR,'hs_categories.json')
input_country = ["china","usa","japan","france","netherlands","russia","uk","mexico","uae","india","australia","brazil","turkey","nigeria","hong kong","israel","kenya","south korea","north korea"]
# print CATEGORIES_FILE

country_req = "https://atlas.media.mit.edu/attr/country/"
country_lookup = {}
country_res = requests.get(country_req, verify=False)
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
hs_req = "https://atlas.media.mit.edu/attr/hs/"
hs_lookup = {}
hs_r = requests.get(hs_req, verify=False)
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
	
	if len(sys.argv) <3 :
		print "Not enough arguments using random countries"
		input_country_name =random.choice(input_country)
		output_country_name =random.choice(input_country)
		input_country_abbrv = country_lookup[input_country_name]
		output_country_abbrv = country_lookup[output_country_name]		
	else:
		# print sys.argv[1],type(sys.argv[1])
		input_country_abbrv = sys.argv[1].encode('ascii','ignore')
		output_country_abbrv = sys.argv[2].encode('ascii','ignore')
	# print  sys.argv[1]
	# if sys.argv[2]:
	# print sys.argv[2]
	
	prod_id = random.choice(input_products_lookup.keys())
	 # = random.choice()

	# print input_country_abbrv,output_country_abbrv
	# req = "http://atlas.media.mit.edu/hs/export/all/%s/%s/show"%(input_country_abbrv,output_country_abbrv)
	req = "http://atlas.media.mit.edu/hs/export/2010/%s/%s/show"%(input_country_abbrv,output_country_abbrv)
	# print req

	r = requests.get(req, verify=False)
	data = json.loads(r.text)
	items =  data[u'data']

	other_products = []
	results = {}
	for item in items:
		hs_id = item[u'hs_id']
		if hs_id in hs_lookup.keys():
			cat = getProductCategory(hs_id,hs_lookup[hs_id])
			cat = cat.encode('ascii','ignore')
			product  = hs_lookup[hs_id].encode('ascii','ignore')
			if cat in results.keys():
				results[cat].append(product.replace("\'",""))
			else:
				results[cat.replace("\'","")] = [product.replace("\'","")]
	print json.dumps(results)
	# print "Exports : "
	# for product in other_products:
		# print product.encode('ascii','ignore')
	# print " ".join(other_products)