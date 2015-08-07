import os
import re

files =  os.listdir(".")

for f in files:
	if ".svg" in f:	
		svg = open(f,"r+")
		text =  svg.read()
		i = f.split(".")[0]
		new_text = re.sub('Layer_1','Layer_'+i,text)
		print f
		# print new_text
		svg.seek(0)
		svg.write(new_text)
		svg.truncate()



# onlyfiles = [ f for f in os.listdir(mypath) if os.isfile(join(mypath,f)) ]

# print onlyfiles