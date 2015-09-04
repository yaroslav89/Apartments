<?php
	class AddjsnObject 
	{
		private $url,$id,$get_array,$output,$image_url,$status;
		private $id_arr=[];
		private $temp_array = [];

		public function __construct($url) 
		{	
			if (!empty($url)) 
			{
				$this->url = $url;
				$this->get_array = json_decode(file_get_contents($this->url),true);
				$arr = $this->get_array['apartments'];
					for ($i = 0; $i < count($arr); $i++) 
					{
						array_push($this->id_arr,$arr[$i]['id']);	
					}
				$this->id = max($this->id_arr) + 1;
			}
			else 
			{
				echo "<h1>Wrong Url</h1>";
			}
		} 

		public function upload($file) 
		{
			$dir = '../js/json/img/';
			if (isset($file['tmp_name']) && isset($file['name']) && !empty($file['name']) && !empty($file['tmp_name'])) 
			{
				$checkimg = getimagesize($file['tmp_name']);
				if ($checkimg == false) 
				{
					$this->status = 0;
					echo "<h1>File is not an image</h1>";
				}
				elseif ($file['size'] > 500000) {
					$this->status = 0;
					echo "<h1>Image file is too big,image size must not more the 500kb</h1>";
				}
				
				else 
				{
					$uploadfile = $dir .$this->id .basename($file['name']);
					move_uploaded_file($file['tmp_name'], $uploadfile);
					$this->image_url = "js/json/img/".$this->id .basename($file['name']);
					$this->status = 1;
				}
			}		
		}

		public function __set($name, $value) 
		{
			if(isset($name) && isset($value) && !empty($name) && !empty($value)) 
			{
				$this->temp_array['id'] = $this->id;
				$this->temp_array['image'] = $this->image_url;
				$this->temp_array[$name] = $value;
			}
		}

		public function push_data() 
		{	
			if ($this->status == 1) 
			{ 
				if (!empty($this->temp_array)) 
				{
					array_push($this->get_array['apartments'], $this->temp_array);
					$this->output = json_encode($this->get_array);
				}
				if (file_put_contents($this->url, $this->output)) 
				{
					echo "<h1>New Apartment was added successfully!</h1>";
				}
				else 
				{
					echo "<h1>Sorry unknown error occurred</h1>";
				}
			}
		}
	} 
?>