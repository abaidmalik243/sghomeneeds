new Vue({
  el: '#app',
  data: {
    list: ['one', 'two', 'three', 'four', 'five'],
    selecteditem: '',
    searchitem: ''
  },
  
  computed: {
    filteredlist () {
      if (!this.searchitem) {
        return this.list
      }
      return this.list.filter(item => item.toLowerCase().indexOf(this.searchitem.toLowerCase()) >= 0)
    }
  },
  
  methods: {
    selectFirst (e) {
      if (e.which !== 13 || this.filteredlist.length <= 0) {
        return
      }

      this.selecteditem = this.filteredlist[0]
      this.searchitem = ''
      this.toggleDropdown(e)
    },
    
    selectItem (item) {
      this.selecteditem = item
    },
    
    toggleDropdown (e) {
      e.target.closest('label').classList.toggle('active')
      e.target.closest('label').querySelector('input').focus()
    }
  }
})