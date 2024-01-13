from flask import Blueprint, redirect
from app.forms import ListForm
from app.models import db, List
from .auth_routes import validation_errors_to_error_messages

bp = Blueprint("lists", __name__)


# Create Route
# Logged in User can create a List on their Board
@bp.route("/boards/<int:board_id>/lists", methods=["POST"])
def create_lists(board_id):
    form = ListForm()
    if form.validate_on_submit():
        board_id = board_id
        name = form.name.data
        new_list = List(board_id=board_id, name=name)
        db.session.add(new_list)
        db.commit()
        return new_list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  



# Read Route
# Logged in User can view a List on their Board
@bp.route("/boards/<int:board_id>/lists")
def read_lists(board_id):
    lists = List.query.all(board_id)
    if lists:
        return {'lists': [list.to_dict() for list in lists]}
    return 'Board list not found'



# Update Route
# Logged in User can update a List on their Board
@bp.route("/lists/<int:list_id>", methods=["PUT"])
def update_lists(list_id):
    form = ListForm()
    list = List.query.get(List.id == list_id)
    if list:
        if form.validate_on_submit():
            name = form.name.data
            form.name = name
            db.commit()
            return list.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# Delete Route
# Logged in User can delete a List on their Board
@bp.route("/lists/<int:list_id>", methods=["DELETE"])
def delete_lists(list_id):
    list = List.filter(List.id == list_id).delete()

    db.session.commit()
