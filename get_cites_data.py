import sys
import random
import csv
from urllib2 import Request,urlopen
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from pprint import pprint
import json

input_country_ids = {"chn":160,
				"usa":80,
				"jpn":244,
				"fra":48,
				"nld":165,
				"rus":208,
				"gbr":41,
				"mex":138,
				"are":107,
				"ind":180,
				"aus":113,
				"bra":97,
				"tur":112,
				"nga":53,
				"hkg":167,
				"isr":174,
				"ken":30,
				"kor":67,
				"pkr":100}

def get_cites_data(src,dst,start_time):


	url =("http://trade.cites.org/cites_trade/shipments?"\
		"filters[time_range_start]=%d"\
		"&filters[time_range_end]=2014"\
		"&filters[exporters_ids][]=%d"\
		"&filters[importers_ids][]=%d"\
		"&filters[sources_ids][]=all_sou&filters[purposes_ids][]=all_pur"\
		"&filters[terms_ids][]=all_ter&filters[selection_taxon]=taxon&filters[taxon_concepts_ids][]=&filters[reset]=&web_disabled="\
		"&filters[report_type]=comptab")%(start_time,input_country_ids[src],input_country_ids[dst])
	
	request = Request(url)
	response = urlopen(request).read()
	data = BeautifulSoup(response,"html.parser")
	
	newDictionary=json.loads(str(data))
	# print newDictionary

	if len(newDictionary["shipment_comptab_export"]["rows"]) > 0 :
		print json.dumps(newDictionary)
		# for row in  newDictionary["shipment_comptab_export"]["rows"]:
			# print newDictionary
	else:
		if start_time > 1990:
			# print "Not enough data for",src,dst
			# print "going from",start_time
			start_time = start_time -1
			# print "going to",start_time
			get_cites_data(src,dst,start_time)

		else:
			# print "Cant find anything!"
			pass
			
			print json.dumps({"hasData":False})
			


if __name__ == '__main__':
	
	if len(sys.argv) <4 :
		print "Not enough arguments using random countries"
		src =random.choice(input_country_ids.keys())
		dst =random.choice(input_country_ids.keys())
		
		get_cites_data(src,dst,2005)
	else:
		src = sys.argv[1].encode('ascii','ignore')
		dst = sys.argv[2].encode('ascii','ignore')
		start = sys.argv[3].encode('ascii','ignore')
		if src == "prk":
			src = "pkr"
		elif dst == "prk":
			src = "pkr"
		get_cites_data(src,dst,int(start))

# pprint(html)
# zipCode = urlToRequest[urlToRequest.find("z=")+2:urlToRequest.find("&u")] 	