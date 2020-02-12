#!/bin/bash

# Dumps the dump.json into the database
mongoimport --jsonArray --db triposo --collection locations --file dump.json