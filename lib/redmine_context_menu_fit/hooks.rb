# frozen_string_literal: true

module RedmineContextMenuFit
  class Hooks < Redmine::Hook::ViewListener
    def view_layouts_base_html_head(_context = {})
      javascript_include_tag 'context_menu_fit', plugin: 'redmine_context_menu_fit'
    end
  end
end
