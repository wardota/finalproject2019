variable=$1;


if [ $variable == green ]; then
	echo -e "${variable}  hijau"
elif [ $variable == blue ]; then
	echo -e "${variable}  biru"
elif [ $variable == yellow ]; then
	echo -e "${variable}  kuning"
elif [ $variable == orange ]; then
	echo -e "${variable}  oren"
else
	echo -e "not in list"
fi
